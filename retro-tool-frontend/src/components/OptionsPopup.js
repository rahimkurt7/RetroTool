import React, { useContext, useState, useEffect } from "react";
import { TeamsContext } from "../context/TeamsContext";

const OptionsPopup = ({ onClose }) => {
  const { teamsLink, setTeamsLink } = useContext(TeamsContext);
  const [inputValue, setInputValue] = useState(teamsLink || '');

  // Sayfa açıldığında context'ten gelen değeri input'a yaz
  useEffect(() => {
    setInputValue(teamsLink);
  }, [teamsLink]);

  const handleSave = () => {
    setTeamsLink(inputValue);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3 style={{ marginBottom: "10px" }}>Options</h3>

        {/* ...diğer seçenekler */}

        <div style={styles.option}>
          <label>Set Teams Meeting Link</label>
          <input
            type="text"
            placeholder="https://teams.live.com/meet/..."
            style={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
          <button onClick={handleSave} style={styles.saveButton}>Kaydet</button>
        </div>

        <button onClick={onClose} style={styles.closeButton}>X</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  popup: {
    position: "relative", width: "300px", backgroundColor: "#fff",
    borderRadius: "10px", padding: "20px", boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  },
  option: { marginBottom: "15px" },
  input: { width: "100%", padding: "5px", marginTop: "5px" },
  closeButton: {
    position: "absolute", top: "10px", right: "10px",
    border: "none", background: "transparent", fontSize: "16px", cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#5271ff", color: "#fff", border: "none",
    padding: "6px 12px", borderRadius: "6px", cursor: "pointer"
  },
};

export default OptionsPopup;
