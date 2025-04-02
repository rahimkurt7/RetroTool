using RetroTool.API.Models;

public class Poll
{
    public int Id { get; set; }
    public string Question { get; set; }
    public string CreatedBy { get; set; }
    public string Sprint { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public ICollection<PollOption> Options { get; set; }
}
