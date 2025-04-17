// Models/Card.cs
using System;

namespace RetroToolAPI.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Content { get; set; } // Post-it içeriği
        public string Category { get; set; } // Mad, Sad, Glad gibi
        public string Username { get; set; } // Kim yazdı
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
