namespace RetroTool.API.Models
{
    public class PollVoteRequest
    {
        public string Question { get; set; }
        public string OptionText { get; set; }
        public string VotedBy { get; set; }
        public string SprintLabel { get; set; }
    }
}
