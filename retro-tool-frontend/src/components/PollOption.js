// src/components/PollOption.js

import React from "react";

const PollOption = ({
  option,
  index,
  isSelected,
  onSelect,
  totalVotes,
}) => {
  const voteCount = option.votes.length;
  const votePercentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: isSelected ? "#e0f0ff" : "#fff",
      }}
    >
      <label style={styles.label}>
        <input
          type="radio"
          checked={isSelected}
          onChange={onSelect}
          style={styles.radio}
        />
        {option.text}
      </label>

      <div style={styles.rightArea}>
        {/* Gri doluluk barı */}
        <div style={styles.barBackground}>
          <div
            style={{
              ...styles.barFill,
              width: `${votePercentage}%`,
            }}
          ></div>
        </div>

        {/* Oy sayısı yuvarlağı */}
        <div
          style={{
            ...styles.voteCircle,
            backgroundColor: isSelected ? "#3b82f6" : "#ccc",
            color: isSelected ? "#fff" : "#000",
          }}
        >
          {voteCount}
        </div>

        {/* Oy veren kullanıcıların baş harfleri */}
        <div style={styles.voterInitials}>
          {option.votes.map((user, idx) => (
            <div key={idx} style={styles.userCircle}>
              {user.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: 1,
  },
  radio: {
    cursor: "pointer",
  },
  rightArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  barBackground: {
    width: "100px",
    height: "6px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    overflow: "hidden",
  },
  barFill: {
    height: "6px",
    backgroundColor: "#bbb",
  },
  voteCircle: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  voterInitials: {
    display: "flex",
    gap: "4px",
  },
  userCircle: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default PollOption;
