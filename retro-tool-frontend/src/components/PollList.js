// src/components/PollList.js

import React from "react";
import PollItem from "./PollItem";

const PollList = ({ polls, onVote }) => {
  return (
    <div style={styles.container}>
      {polls.length === 0 ? (
        <p style={styles.emptyText}>Henüz anket oluşturulmadı.</p>
      ) : (
        polls.map((poll, index) => (
          <PollItem
            key={index}
            poll={poll}
            onVote={onVote}
          />
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    height: "80vh",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #ddd",
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default PollList;
