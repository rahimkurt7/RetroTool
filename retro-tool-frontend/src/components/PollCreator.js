import React, { useState } from "react";
import axios from "axios";
import { FaCheck, FaTrash } from "react-icons/fa";

const PollCreator = ({ onPollCreated }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const MAX_OPTIONS = 5;

  const handleAddOption = () => {
    if (options.length < MAX_OPTIONS) {
      setOptions([...options, ""]);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
  };

  const handleCreate = async () => {
    // Validasyon
    if (!question.trim() || options.some((o) => !o.trim())) {
      alert("Lütfen soru ve tüm şıkları doldurun.");
      return;
    }

    // Payload oluşturma
    const payload = {
      question: question.trim(),
      createdBy: "ERAY",
      sprint: "21.02.2025",
      options: options
        .filter((text) => text.trim() !== "")
        .map((text) => ({ text: text.trim(), votes: [] })),
    };

    console.log("📦 Gönderilen Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post("https://localhost:7048/api/poll", payload);
      console.log("✅ Anket oluşturuldu:", response.data);
      resetForm();
      if (onPollCreated) onPollCreated(); // üst bileşene haber ver
    } catch (error) {
      console.error("❌ HATA:", error);
      if (error.response) {
        console.error("🚨 Sunucu Yanıtı:", error.response.data);
        alert("Sunucu hatası:\n" + JSON.stringify(error.response.data, null, 2));
      } else {
        alert("Ağ bağlantı hatası oluştu.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Anket sorunuzu yazın..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={styles.questionInput}
      />

      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Seçenek ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={styles.optionInput}
          />
        </div>
      ))}

      {options.length < MAX_OPTIONS && (
        <button onClick={handleAddOption} style={styles.addButton}>
          + Add Option
        </button>
      )}

      <div style={styles.actions}>
        <FaCheck onClick={handleCreate} style={styles.checkIcon} />
        <FaTrash onClick={resetForm} style={styles.trashIcon} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "12px",
  },
  questionInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  optionInput: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
  },
  addButton: {
    marginTop: "5px",
    backgroundColor: "transparent",
    border: "none",
    color: "#555",
    cursor: "pointer",
  },
  actions: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
  },
  checkIcon: {
    color: "green",
    fontSize: "20px",
    cursor: "pointer",
  },
  trashIcon: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default PollCreator;
