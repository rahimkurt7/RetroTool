import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaInfoCircle } from "react-icons/fa";

const Category = ({ id, title, description, onDrop, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Post-it bırakma alanı (useDrop kullanımı)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "POST_IT",
    drop: (item) => onDrop(item, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop} // useDrop ile kategoriye post-it bırakılmasını sağlıyoruz
      className="category"
      style={{
        minHeight: "200px",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: isOver ? "#e0e0e0" : "#f4f4f4",
        position: "relative", // Tooltip için önemli
      }}
    >
      <div className="category-header">
        <h2>{title}</h2>

        {/* Bilgi ikonu (ℹ️) */}
        <FaInfoCircle
          className="info-icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip((prev) => !prev)}
          style={{ cursor: "pointer", marginLeft: "8px", position: "relative" }}
        />

        {/* Açıklama (Tooltip) */}
        {showTooltip && (
          <div className="tooltip">
            {description}
          </div>
        )}
      </div>

      {children}

      <p style={{ color: "#888", fontSize: "14px" }}>
        {children.length === 0 ? "No cards yet." : ""}
      </p>
    </div>
  );
};

export default Category;
