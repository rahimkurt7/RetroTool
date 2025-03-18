using RetroTool.API.Models;

public class RetroCard
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;

    public int CategoryId { get; set; }
    public RetroCategory? Category { get; set; } // Nullable yapıldı
}
