using Microsoft.AspNetCore.Mvc;
using RetroTool.API.Data;
using RetroTool.API.Models;

namespace RetroTool.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RetroToolDbContext _context;

        public AuthController(RetroToolDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Username == loginUser.Username &&
                u.Password == loginUser.Password
            );

            if (user == null)
            {
                return Unauthorized(new { message = "Kullanıcı adı veya şifre yanlış." });
            }

            return Ok(new { message = "Giriş başarılı!" });
        }
    }
}
