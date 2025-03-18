using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetroTool.API.Data;
using RetroTool.API.Models;

namespace RetroTool.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetroCategoryController : ControllerBase
    {
        private readonly RetroToolDbContext _context;

        public RetroCategoryController(RetroToolDbContext context)
        {
            _context = context;
        }

        // GET: api/RetroCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RetroCategory>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/RetroCategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RetroCategory>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // POST: api/RetroCategory
        [HttpPost]
        public async Task<ActionResult<RetroCategory>> PostCategory(RetroCategory category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        // PUT: api/RetroCategory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, RetroCategory category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/RetroCategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
