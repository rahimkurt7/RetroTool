using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroTool.API.Data;
using RetroToolAPI.Models;

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
            if (card == null || string.IsNullOrWhiteSpace(card.Content) || string.IsNullOrWhiteSpace(card.Category) || string.IsNullOrWhiteSpace(card.Username))
            {
                return BadRequest("Eksik kart bilgisi gönderildi.");
            }

            var existing = await _context.Cards
                .FirstOrDefaultAsync(c => c.Content == card.Content && c.Category == card.Category && c.Username == card.Username);

            if (existing == null)
                return NotFound("Kart bulunamadı.");

            _context.Cards.Remove(existing);
            await _context.SaveChangesAsync();
            return Ok("Kart silindi.");
        }
    }
}