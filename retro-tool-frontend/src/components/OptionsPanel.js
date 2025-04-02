// src/components/OptionsPanel.js
import React, { useContext } from "react";
import { TeamsContext } from "../context/TeamsContext";

const OptionsPanel = ({ onClose }) => {
  const { teamsLink, setTeamsLink } = useContext(TeamsContext);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Set Teams Meeting Link</h3>
        <input
          type="text"
          placeholder="https://teams.live.com/meet/..."
          value={teamsLink}
          onChange={(e) => setTeamsLink(e.target.value)}
          style={styles.input}
        />
        <button onClick={onClose} style={styles.button}>Kapat</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  modal: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    width: "300px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    marginBottom: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#0078D4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default OptionsPanel;
