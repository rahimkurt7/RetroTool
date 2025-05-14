// src/components/PollCreator.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTrash } from "react-icons/fa";

const PollCreator = ({ onPollCreated }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [createdBy, setCreatedBy] = useState("");
  const [sprintLabel, setSprintLabel] = useState("");
  const MAX_OPTIONS = 5;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCreatedBy(storedUser.username);
    }

    const today = new Date();
    const base = new Date("2025-02-17");
    const diffDays = Math.floor((today - base) / (1000 * 60 * 60 * 24));
    const sprintIndex = Math.floor(diffDays / 7) + 1;
    setSprintLabel(`Sprint ${sprintIndex}`);
  }, []);

  const handleAddOption = () => {
    if (options.length < MAX_OPTIONS) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
  };

  const handleCreate = async () => {
    if (!question.trim() || options.some((o) => !o.trim())) {
      alert("Soru ve tüm seçenekler doldurulmalıdır.");
      return;
    }

    const payload = {
      question: question.trim(),
      createdBy,
      sprintLabel,
      options: options.map((o) => o.trim()),
    };

    try {
      const res = await axios.post("https://localhost:7048/api/poll/create", payload);
      alert("✅ Anket oluşturuldu.");
      resetForm();
      if (onPollCreated) onPollCreated();
    } catch (err) {
      console.error("Anket oluşturma hatası:", err);
      alert("Hata: " + err.response?.data || "Sunucu hatası.");
    }
  };

  return (
    <div style={styles.container}>
      <h3>Yeni Anket Oluştur</h3>
      <input
        type="text"
        placeholder="Soru yazınız..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={styles.input}
      />

      {options.map((option, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Seçenek ${i + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(i, e.target.value)}
          style={styles.input}
        />
      ))}

      {options.length < MAX_OPTIONS && (
        <button onClick={handleAddOption} style={styles.addButton}>+ Şık Ekle</button>
      )}

      <div style={styles.actions}>
        <FaCheck onClick={handleCreate} style={styles.iconCheck} />
        <FaTrash onClick={resetForm} style={styles.iconTrash} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    backgroundColor: "#e0e0e0",
    border: "none",
    padding: "8px 12px",
    marginBottom: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    marginTop: "10px",
  },
  iconCheck: {
    color: "green",
    fontSize: "20px",
    cursor: "pointer",
  },
  iconTrash: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default PollCreator;
