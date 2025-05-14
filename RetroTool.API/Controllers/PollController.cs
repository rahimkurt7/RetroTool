using Microsoft.AspNetCore.Mvc;
using RetroTool.API.Data;
using RetroToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RetroTool.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PollController : ControllerBase
    {
        private readonly RetroToolDbContext _context;

        public PollController(RetroToolDbContext context)
        {
            _context = context;
        }

        // ✅ 1. Yeni anket oluştur (çoklu seçeneklerle)
        [HttpPost("create")]
        public async Task<IActionResult> CreatePoll([FromBody] PollCreateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Question) || request.Options == null || request.Options.Count < 2)
                return BadRequest("Anket sorusu ve en az 2 seçenek gerekli.");

            foreach (var option in request.Options)
            {
                var poll = new Poll
                {
                    Question = request.Question,
                    OptionText = option.Trim(),
                    CreatedBy = request.CreatedBy,
                    SprintLabel = request.SprintLabel,
                    CreatedAt = DateTime.Now,
                    VotedBy = "" // Oy henüz verilmedi
                };
                _context.Polls.Add(poll);
            }

            await _context.SaveChangesAsync();
            return Ok("Anket başarıyla oluşturuldu.");
        }

        // ✅ 2. Tüm anketleri getir
        [HttpGet("all")]
        public IActionResult GetAllPolls()
        {
            var polls = _context.Polls.ToList();
            return Ok(polls);
        }

        // ✅ 3. Kullanıcı ve sprint'e göre filtrele
        [HttpGet("filter")]
        public IActionResult FilterPolls(string? username, string? sprint)
        {
            var query = _context.Polls.AsQueryable();

            if (!string.IsNullOrWhiteSpace(username))
                query = query.Where(p => p.CreatedBy == username);

            if (!string.IsNullOrWhiteSpace(sprint))
                query = query.Where(p => p.SprintLabel == sprint);

            return Ok(query.ToList());
        }

        // ✅ 4. Oy kullan (PollVoteRequest modeli ile)
        [HttpPost("vote")]
        public async Task<IActionResult> Vote([FromBody] PollVoteRequest vote)
        {
            if (string.IsNullOrWhiteSpace(vote.VotedBy))
                return BadRequest("Oy veren kullanıcı adı eksik.");

            // Aynı kullanıcı daha önce bu soruya oy vermiş mi kontrolü
            var alreadyVoted = _context.Polls.Any(p =>
                p.Question == vote.Question &&
                p.SprintLabel == vote.SprintLabel &&
                p.VotedBy == vote.VotedBy &&
                !string.IsNullOrEmpty(p.VotedBy));

            if (alreadyVoted)
                return BadRequest("Bu kullanıcı zaten bu anket için oy kullandı.");

            // Oy verilecek seçeneği bul
            var target = _context.Polls.FirstOrDefault(p =>
                p.Question == vote.Question &&
                p.SprintLabel == vote.SprintLabel &&
                p.OptionText == vote.OptionText &&
                string.IsNullOrEmpty(p.VotedBy)); // sadece boş olan şık seçilebilir

            if (target == null)
                return NotFound("Oy verilecek seçenek bulunamadı.");

            // Oy verildiğini kaydet
            target.VotedBy = vote.VotedBy;

            await _context.SaveChangesAsync();
            return Ok("Oyunuz başarıyla kaydedildi.");
        }

        // ✅ 5. Anketleri soru bazlı gruplayarak getir
        [HttpGet("grouped")]
        public IActionResult GetGroupedPolls()
        {
            var groupedPolls = _context.Polls
                .Where(p => string.IsNullOrEmpty(p.VotedBy)) // sadece seçenekler
                .GroupBy(p => new { p.Question, p.CreatedBy, p.SprintLabel })
                .Select(g => new
                {
                    question = g.Key.Question,
                    createdBy = g.Key.CreatedBy,
                    sprintLabel = g.Key.SprintLabel,
                    options = g.Select(p => p.OptionText).Distinct().ToList()
                })
                .ToList();

            return Ok(groupedPolls);
        }
    }

    // 🧾 Anket oluşturma modeli
    public class PollCreateRequest
    {
        public string Question { get; set; }
        public List<string> Options { get; set; }
        public string CreatedBy { get; set; }
        public string SprintLabel { get; set; }
    }

    // 🗳 Oy verme modeli
    public class PollVoteRequest
    {
        public string Question { get; set; }
        public string OptionText { get; set; }
        public string VotedBy { get; set; }
        public string SprintLabel { get; set; }
    }
}
