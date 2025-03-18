using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroTool.API.Data;
using RetroTool.API.Models;

namespace RetroTool.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroCardController : ControllerBase
    {
        private readonly RetroToolDbContext _context;

        public RetroCardController(RetroToolDbContext context)
        {
            _context = context;
        }

        // GET: api/RetroCard
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetroCard>>> GetCards()
        {
            return await _context.Cards.Include(c => c.Category).ToListAsync();
        }

        // GET: api/RetroCard/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RetroCard>> GetCard(int id)
        {
            var card = await _context.Cards.Include(c => c.Category).FirstOrDefaultAsync(c => c.Id == id);

            if (card == null)
            {
                return NotFound();
            }

            return card;
        }

        // POST: api/RetroCard
        [HttpPost]
        public async Task<ActionResult<RetroCard>> PostCard(RetroCard card)
        {
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCard), new { id = card.Id }, card);
        }

        // PUT: api/RetroCard/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCard(int id, RetroCard card)
        {
            if (id != card.Id)
            {
                return BadRequest();
            }

            _context.Entry(card).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/RetroCard/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}