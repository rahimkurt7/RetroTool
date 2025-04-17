import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { FaPaintBrush, FaSmile, FaTimes } from "react-icons/fa";

const PostIt = ({ id, content, color, emoji, onUpdate, onDelete, category }) => {
  const [text, setText] = useState(content || "");
  const [bgColor, setBgColor] = useState(color || "#DAB6FC");
  const [selectedEmoji, setSelectedEmoji] = useState(emoji || null);
  const [showPalette, setShowPalette] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const textareaRef = useRef();

  const colors = ["#ADD8E6", "#90EE90", "#FFD700", "#FFB6C1", "#DAB6FC"];
  const emojis = ["❤️", "😊", "🥳", "🤩", "😭", "😡"];

  const handleColorChange = (newColor) => {
    setBgColor(newColor);
    setShowPalette(false);
    onUpdate(id, text, newColor, selectedEmoji);
  };

  const handleEmojiSelect = (newEmoji) => {
    setSelectedEmoji(newEmoji);
    setShowEmojis(false);
    onUpdate(id, text, bgColor, newEmoji);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onUpdate(id, newText, bgColor, selectedEmoji);
  };

  // ✅ useDrag güncellendi: textareaRef ile son içeriği okur
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "POST_IT",
    item: () => {
      const latestText = textareaRef.current?.value || "";
      return {
        id,
        content: latestText,
        color: bgColor,
        emoji: selectedEmoji,
      };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="post-it"
      style={{
        backgroundColor: bgColor,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <textarea
        ref={textareaRef}
        className="post-it-text"
        value={text}
        onChange={handleTextChange}
        maxLength={200}
        placeholder="Write your note here"
      />

      {/* Sağ üst köşe - Renk seçici */}
      <div className="top-right">
        <FaPaintBrush onClick={() => setShowPalette(!showPalette)} title="Change Color" />
        {showPalette && (
          <div className="color-palette">
            {colors.map((c) => (
              <div
                key={c}
                className="color-box"
                style={{ backgroundColor: c }}
                onClick={() => handleColorChange(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sağ alt köşe - Emoji seçici */}
      <div className="bottom-right">
        <FaSmile onClick={() => setShowEmojis(!showEmojis)} title="Choose Emoji" />
        {showEmojis && (
          <div className="emoji-dropdown">
            {emojis.map((e) => (
              <span key={e} onClick={() => handleEmojiSelect(e)}>
                {e}
              </span>
            ))}
          </div>
        )}
        {selectedEmoji && <span className="selected-emoji">{selectedEmoji}</span>}
      </div>

      {/* Sol alt köşe - Silme butonu */}
      {category && (
        <div className="bottom-left">
          <FaTimes className="delete-btn" title="Delete" onClick={() => onDelete(id)} />
        </div>
      )}
    </div>
  );
};

export default PostIt;
