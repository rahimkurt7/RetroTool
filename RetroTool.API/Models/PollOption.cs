using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RetroTool.API.Models
{
    public class PollOption
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        public int PollId { get; set; }

        [JsonIgnore] // ✅ JSON'dan gelen veri bunu doldurmasın!
        public Poll Poll { get; set; }

        [JsonIgnore] // ✅ Oylar da zorunlu değil, EF bunu DB’den yükler
        public ICollection<PollVote> Votes { get; set; } = new List<PollVote>();
    }
}
 