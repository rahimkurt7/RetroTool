// src/pages/CreatePollPage.js

import React, { useState } from "react";
import PollList from "../components/PollList";
import PollCreator from "../components/PollCreator";
import FilterModal from "../components/FilterModal";

const mockUsers = ["ERAY", "MOCAK", "EAKCA"];
const mockSprints = ["21.02.2025", "28.02.2025"];

const CreatePollPage = () => {
  const [polls, setPolls] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ user: "", sprint: "" });

  // Yeni anket oluşturulunca çağrılır
  const handleCreatePoll = (newPoll) => {
    const poll = {
      id: Date.now().toString(),
      question: newPoll.question,
      userVote: null,
      options: newPoll.options.map((text) => ({ text, votes: [] })),
      createdBy: "ERAY", // örnek olarak
      sprint: "21.02.2025", // örnek olarak
    };
    setPolls([...polls, poll]);
  };

  // Oy kullanıldığında çağrılır
  const handleVote = (pollId, optionIndex) => {
    const updatedPolls = polls.map((poll) => {
      if (poll.id === pollId) {
        // Önceden oy kullandıysa sil
        const newOptions = poll.options.map((opt) => ({
          ...opt,
          votes: opt.votes.filter((voter) => voter !== "ERAY"),
        }));
        // Yeni oyu ekle
        newOptions[optionIndex].votes.push("ERAY");
        return { ...poll, options: newOptions, userVote: optionIndex };
      }
      return poll;
    });
    setPolls(updatedPolls);
  };

  // Filtre değiştiğinde çağrılır
  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  // Filtreye göre anketleri süz
  const filteredPolls = polls.filter((poll) => {
    const matchUser = filters.user ? poll.createdBy === filters.user : true;
    const matchSprint = filters.sprint ? poll.sprint === filters.sprint : true;
    return matchUser && matchSprint;
  });

  return (
    <div>
      {/* Filtre Butonları */}
      <div style={styles.header}>
        <button onClick={() => setShowFilter(true)} style={styles.filterButton}>
          Filtrele
        </button>
        <span><strong>User:</strong> {filters.user || "Tümü"}</span>
        <span><strong>Sprint:</strong> {filters.sprint || "Tümü"}</span>
      </div>

      {/* Sayfa içeriği */}
      <div style={styles.container}>
        <div style={styles.left}>
          <PollList polls={filteredPolls} onVote={handleVote} />
        </div>
        <div style={styles.right}>
          <PollCreator onCreatePoll={handleCreatePoll} />
        </div>
      </div>

      {/* Filtre Modal */}
      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onFilterChange={handleFilterChange}
        users={mockUsers}
        sprints={mockSprints}
      />
    </div>
  );
};

const styles = {
  header: {
    padding: "10px 20px",
    backgroundColor: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  filterButton: {
    backgroundColor: "#5271ff",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    padding: "20px",
    gap: "20px",
  },
  left: {
    flex: 1,
    maxHeight: "80vh",
    overflowY: "auto",
  },
  right: {
    flex: 1,
  },
};

export default CreatePollPage;
