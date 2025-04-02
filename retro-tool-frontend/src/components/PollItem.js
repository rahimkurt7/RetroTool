// src/components/PollItem.js

import React, { useState } from "react";
import PollOption from "./PollOption";

const PollItem = ({ poll, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(poll.userVote || null);

  const handleVote = (optionIndex) => {
    setSelectedOption(optionIndex);
    onVote(poll.id, optionIndex); // Üst bileşene bildir
  };

  return (
    <div style={styles.pollItem}>
      <h4 style={styles.question}>{poll.question}</h4>
      {poll.options.map((option, index) => (
        <PollOption
          key={index}
          index={index}
          option={option}
          isSelected={selectedOption === index}
          onSelect={() => handleVote(index)}
          totalVotes={poll.options.reduce((sum, o) => sum + o.votes.length, 0)}
        />
      ))}
    </div>
  );
};

const styles = {
  pollItem: {
    marginBottom: "25px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  question: {
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default PollItem;
