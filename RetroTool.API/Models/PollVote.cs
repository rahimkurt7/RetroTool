namespace RetroTool.API.Models
{
    public class PollVote
    {
        public int Id { get; set; }
        public string VotedBy { get; set; }

        public int OptionId { get; set; }
        public PollOption Option { get; set; }
    }
}
