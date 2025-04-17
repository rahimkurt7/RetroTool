import React, { useState } from "react";
import PostIt from "./PostIt";
import Category from "./Category";

const Board = () => {
  const [postIts, setPostIts] = useState([
    { id: 1, content: "", color: "#DAB6FC", emoji: null, category: null },
  ]);

  const handleUpdate = (id, content, color, emoji) => {
    setPostIts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, content, color, emoji } : p))
    );
  };

  const handleDelete = async (id) => {
    const deleted = postIts.find((p) => p.id === id);

    if (deleted && deleted.content && deleted.category) {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        const username = localUser?.username || "guest";

        const response = await fetch("https://localhost:7048/api/card/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: deleted.content,
            category: deleted.category,
            username: username,
          }),
        });

        if (!response.ok) {
          console.error("🛑 Kart veritabanından silinemedi.");
        }
      } catch (error) {
        console.error("🌐 Sunucuya bağlanılamadı.", error);
      }
    }

    setPostIts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDrop = async (droppedItem, categoryId) => {
    const { id, content, color, emoji } = droppedItem;

    if (!content || content.trim() === "") {
      console.warn("🛑 Boş içerikli post-it veritabanına gönderilmiyor.");
      return;
    }

    const localUser = JSON.parse(localStorage.getItem("user"));
    const username = localUser?.username || "guest";

    const updatedPostIt = {
      Content: content,
      Color: color,
      Emoji: emoji,
      Category: categoryId,
      Username: username,
    };

    try {
      const response = await fetch("https://localhost:7048/api/card/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPostIt),
      });

      if (!response.ok) {
        console.error("🛑 Kart veritabanına kaydedilemedi.");
      }
    } catch (error) {
      console.error("🌐 Sunucuya bağlanılamadı.", error);
    }

    setPostIts((prev) => {
      const updatedPostIts = prev.map((p) =>
        p.id === id ? { ...p, category: categoryId } : p
      );

      const hasUncategorized = updatedPostIts.some((p) => p.category === null);
      if (!hasUncategorized) {
        updatedPostIts.push({
          id: prev.length + 1,
          content: "",
          color: "#DAB6FC",
          emoji: null,
          category: null,
        });
      }

      return updatedPostIts;
    });
  };

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
          <Category
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            onDrop={handleDrop}
          >
            {postIts
              .filter((p) => p.category === category.id)
              .map((p) => (
                <PostIt
                  key={p.id}
                  id={p.id}
                  content={p.content}
                  color={p.color}
                  emoji={p.emoji}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  category={p.category}
                />
              ))}
          </Category>
        ))}
      </div>

      <div className="post-it-container">
        {postIts
          .filter((p) => !p.category)
          .map((p) => (
            <PostIt
              key={p.id}
              id={p.id}
              content={p.content}
              color={p.color}
              emoji={p.emoji}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              category={p.category}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;
