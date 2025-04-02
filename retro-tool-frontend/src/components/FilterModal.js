// src/components/FilterModal.js

import React from "react";

const FilterModal = ({ visible, onClose, onFilterChange, users, sprints }) => {
  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Filtrele</h3>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Kullanıcı Seç:</label>
          <select
            onChange={(e) => onFilterChange("user", e.target.value)}
            style={styles.select}
          >
            <option value="">Tümü</option>
            {users.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.label}>Sprint Seç:</label>
          <select
            onChange={(e) => onFilterChange("sprint", e.target.value)}
            style={styles.select}
          >
            <option value="">Tümü</option>
            {sprints.map((sprint, i) => (
              <option key={i} value={sprint}>
                {sprint}
              </option>
            ))}
          </select>
        </div>

        <button onClick={onClose} style={styles.closeButton}>
          Kapat
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  filterGroup: {
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  closeButton: {
    marginTop: "10px",
    padding: "8px 15px",
    border: "none",
    backgroundColor: "#5271ff",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default FilterModal;
