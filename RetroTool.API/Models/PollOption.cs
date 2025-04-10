using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RetroTool.API.Models
{
    public class PollOption
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        [JsonIgnore] // JSON'dan gönderilmeyecek
        public int PollId { get; set; }

        [JsonIgnore]
        public Poll? Poll { get; set; }  // ❗️ DİKKAT: Poll -> Poll? (nullable yapıldı)

        [JsonIgnore]
        public ICollection<PollVote> Votes { get; set; } = new List<PollVote>();
    }
}
