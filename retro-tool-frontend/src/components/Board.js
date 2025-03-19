import React, { useState } from "react";
import PostIt from "./PostIt";
import Category from "./Category";

const Board = () => {
  // Post-it'leri array içinde yönetiyoruz
  const [postIts, setPostIts] = useState([
    { id: 1, content: "Write your note here", color: "#DAB6FC", emoji: null, category: null },
  ]);

  // Post-it güncelleme fonksiyonu
  const handleUpdate = (id, content, color, emoji) => {
    setPostIts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, content, color, emoji } : p))
    );
  };

  // Post-it silme fonksiyonu (Çarpıya tıklanınca çalışacak)
  const handleDelete = (id) => {
    setPostIts((prev) => prev.filter((p) => p.id !== id));
  };

  // Post-it'i belirli bir kategoriye bırakma fonksiyonu
  const handleDrop = (postIt, categoryId) => {
    setPostIts((prev) => {
      const updatedPostIts = prev.map((p) =>
        p.id === postIt.id ? { ...p, category: categoryId } : p
      );

      // Eğer kategorisiz Post-it kalmadıysa, yeni bir boş Post-it ekle
      const hasUncategorized = updatedPostIts.some((p) => p.category === null);
      if (!hasUncategorized) {
        updatedPostIts.push({
          id: prev.length + 1,
          content: "Write your note here",
          color: "#DAB6FC",
          emoji: null,
          category: null,
        });
      }

      return updatedPostIts;
    });
  };

  // Kategoriler
  const categories = [
    { id: "Mad", title: "Mad", description: "Bu sprintte sizi kızdıran veya olumsuz etkileyen durumlar nelerdi?" },
    { id: "Sad", title: "Sad", description: "Bu sprintte sizi üzen veya hayal kırıklığına uğratan olaylar nelerdi?" },
    { id: "Glad", title: "Glad", description: "Bu sprintte sizi mutlu eden, başarılı giden ya da takımın güçlü yönlerini ortaya koyan şeyler nelerdi?" },
    { id: "Learned", title: "Learned", description: "Bu sprintte öğrendiğiniz yeni bilgiler ve deneyimler nelerdi?" },
    { id: "Suggestion", title: "Suggestion", description: "Takımın veya sürecin gelişmesi için önerileriniz neler? Daha iyi bir süreç için neler yapabiliriz?" },
  ];

  return (
    <div className="board">
      <div className="categories">
        {categories.map((category) => (
          <Category key={category.id} id={category.id} title={category.title} description={category.description} onDrop={handleDrop}>
            {postIts
              .filter((p) => p.category === category.id)
              .map((p) => (
                <PostIt key={p.id} id={p.id} content={p.content} color={p.color} emoji={p.emoji} onUpdate={handleUpdate} onDelete={handleDelete} category={p.category} />
              ))}
          </Category>
        ))}
      </div>

      {/* Kategorize edilmemiş Post-it'ler */}
      <div className="post-it-container">
        {postIts
          .filter((p) => !p.category)
          .map((p) => (
            <PostIt key={p.id} id={p.id} content={p.content} color={p.color} emoji={p.emoji} onUpdate={handleUpdate} onDelete={handleDelete} category={p.category} />
          ))}
      </div>
    </div>
  );
};

export default Board;
