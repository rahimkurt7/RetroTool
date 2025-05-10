using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroTool.API.Data;
using RetroToolAPI.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace RetroTool.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        private readonly RetroToolDbContext _context;

        public CardController(RetroToolDbContext context)
        {
            _context = context;
        }

        // 🟢 Yeni Card (Post-it) ekle
        [HttpPost("add")]
        public async Task<IActionResult> AddCard([FromBody] Card card)
        {
            if (card == null || string.IsNullOrWhiteSpace(card.Content))
            {
                return BadRequest("Geçerli bir kart içeriği gönderilmedi.");
            }

            _context.Cards.Add(card);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Kart başarıyla eklendi.", card });
        }

        // 🟡 Tüm kartları getir
        [HttpGet("all")]
        public IActionResult GetAllCards()
        {
            var cards = _context.Cards.ToList();
            return Ok(cards);
        }

        // 🔴 Kartı sil
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteCard([FromBody] Card card)
        {
            if (card == null ||
                string.IsNullOrWhiteSpace(card.Content) ||
                string.IsNullOrWhiteSpace(card.Category) ||
                string.IsNullOrWhiteSpace(card.Username))
            {
                return BadRequest("Eksik kart bilgisi gönderildi.");
            }

            var existing = await _context.Cards.FirstOrDefaultAsync(c =>
                c.Content == card.Content &&
                c.Category == card.Category &&
                c.Username == card.Username);

            if (existing == null)
                return NotFound("Kart bulunamadı.");

            _context.Cards.Remove(existing);
            await _context.SaveChangesAsync();
            return Ok("Kart silindi.");
        }

        // 🟣 Filtre verilerini getir: Kullanıcı adları ve sprintler
        [HttpGet("filters")]
        public IActionResult GetCardFilters()
        {
            var users = _context.Cards
                .Select(c => c.Username)
                .Distinct()
                .ToList();

            var baseStart = new DateTime(2025, 2, 17); // Sprint 1'in başlangıç tarihi (Pazartesi)

            var sprintList = _context.Cards
                .Select(c => c.CreatedAt.Date)
                .AsEnumerable()
                .Select(date =>
                {
                    var daysDiff = (date - baseStart).Days;
                    var sprintIndex = Math.Max(0, daysDiff / 7);
                    return $"Sprint {sprintIndex + 1}";
                })
                .Distinct()
                .OrderBy(s => s)
                .ToList();

            return Ok(new { users, sprints = sprintList });
        }

        // 🟢 Kategori listesini getir
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _context.Cards
                .Select(c => c.Category)
                .Where(c => !string.IsNullOrEmpty(c))
                .Distinct()
                .OrderBy(c => c)
                .ToList();

            return Ok(categories);
        }
    }
}
