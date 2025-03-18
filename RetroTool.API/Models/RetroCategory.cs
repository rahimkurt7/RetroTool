using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace RetroTool.API.Models
{
    public class RetroCategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public List<RetroCard> Cards { get; set; } = new List<RetroCard>();
    }

}
