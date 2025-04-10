using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroTool.API.Data;
using RetroTool.API.Models;
using System;
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

        // GET: api/poll
        [HttpGet]
        public async Task<IActionResult> GetPolls()
        {
            var polls = await _context.Polls
                .Include(p => p.Options)
                    .ThenInclude(o => o.Votes)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return Ok(polls);
        }

        // POST: api/poll
        [HttpPost]
        public async Task<IActionResult> CreatePoll([FromBody] Poll poll)
        {
            // Temel doğrulama
            if (poll == null)
                return BadRequest("Poll nesnesi null geldi!");

            if (string.IsNullOrWhiteSpace(poll.Question))
                return BadRequest("Soru alanı zorunludur.");

            if (poll.Options == null || !poll.Options.Any())
                return BadRequest("En az bir şık gereklidir.");

            // Oylar boş listeler olarak ayarlanıyor
            foreach (var option in poll.Options)
            {
                option.Votes = new System.Collections.Generic.List<PollVote>();
            }

            poll.CreatedAt = DateTime.Now;
            _context.Polls.Add(poll);
            await _context.SaveChangesAsync();

            return Ok(poll);
        }

        // POST: api/poll/{pollId}/vote?optionId=X&votedBy=Eray
        [HttpPost("{pollId}/vote")]
        public async Task<IActionResult> Vote(int pollId, [FromQuery] int optionId, [FromQuery] string votedBy)
        {
            var poll = await _context.Polls
                .Include(p => p.Options)
                .ThenInclude(o => o.Votes)
                .FirstOrDefaultAsync(p => p.Id == pollId);

            if (poll == null)
                return NotFound("Anket bulunamadı.");

            // Önceki oyları sil
            foreach (var option in poll.Options)
            {
                var toRemove = option.Votes.Where(v => v.VotedBy == votedBy).ToList();
                foreach (var vote in toRemove)
                {
                    option.Votes.Remove(vote);
                }
            }

            // Yeni oyu ekle
            var selectedOption = poll.Options.FirstOrDefault(o => o.Id == optionId);
            if (selectedOption == null)
                return NotFound("Seçilen şık bulunamadı.");

            selectedOption.Votes.Add(new PollVote
            {
                VotedBy = votedBy
            });

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
