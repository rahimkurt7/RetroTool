import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FaPaintBrush, FaSmile, FaTimes } from "react-icons/fa";

const PostIt = ({ id, content, color, emoji, onUpdate, onDelete, category }) => {
  const [text, setText] = useState(content);
  const [bgColor, setBgColor] = useState(color);
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  const [showPalette, setShowPalette] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const colors = ["#ADD8E6", "#90EE90", "#FFD700", "#FFB6C1", "#DAB6FC"];
  const emojis = ["❤️", "😊", "🥳", "🤩", "😭", "😡"];

  // React DnD için sürüklenebilirlik
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "POST_IT",
    item: { id, content: text, color: bgColor, emoji: selectedEmoji },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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
    if (e.target.value.length <= 200) {
      setText(e.target.value);
      onUpdate(id, e.target.value, bgColor, selectedEmoji);
    }
  };

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
        className="post-it-text"
        value={text}
        onChange={handleTextChange}
        maxLength={200}
      />

      {/* Sağ üst köşe - Renk değiştirici */}
      <div className="top-right">
        <FaPaintBrush onClick={() => setShowPalette(!showPalette)} title="Change Color" />
        {showPalette && (
          <div className="color-palette">
            {colors.map((c) => (
              <div key={c} className="color-box" style={{ backgroundColor: c }} onClick={() => handleColorChange(c)}></div>
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

      {/* Sol alt köşe - Çarpı butonu sadece post-it taşındığında gözükecek */}
      {category && (
        <div className="bottom-left">
          <FaTimes className="delete-btn" title="Delete" onClick={() => onDelete(id)} />
        </div>
      )}
    </div>
  );
};

export default PostIt;
