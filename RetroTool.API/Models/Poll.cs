using System;
using System.Collections.Generic;

namespace RetroToolAPI.Models
{
    public class Poll
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string OptionText { get; set; }   // Seçenek içeriği: “Aslan”
        public string CreatedBy { get; set; }
        public string VotedBy { get; set; }      // Oy veren kullanıcı
        public string SprintLabel { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
