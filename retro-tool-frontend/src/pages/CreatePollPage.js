import React, { useState, useEffect } from "react";
import PollList from "../components/PollList";
import PollCreator from "../components/PollCreator";
import FilterModal from "../components/FilterModal";

const mockUsers = ["ERAY", "MOCAK", "EAKCA"];
const mockSprints = ["21.02.2025", "28.02.2025"];

const CreatePollPage = () => {
  const [polls, setPolls] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ user: "", sprint: "" });

  const API_BASE_URL = "https://localhost:7048";

  // ✅ Sayfa yüklendiğinde anketleri çek
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/poll`);
        const data = await response.json();
        setPolls(data);
      } catch (err) {
        console.error("Anketleri çekerken hata oluştu", err);
      }
    };

    fetchPolls();
  }, []);

  // ✅ Yeni anket oluşturulunca backend'e gönder
  const handleCreatePoll = async (newPoll) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/poll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newPoll.question,
          createdBy: "ERAY",
          sprint: "21.02.2025",
          options: newPoll.options.map((text) => ({ text })),
        }),
      });

      const createdPoll = await response.json();
      setPolls([...polls, createdPoll]);
    } catch (err) {
      console.error("Anket oluşturulamadı", err);
    }
  };

  // ✅ Oy kullanıldığında backend'e gönder
  const handleVote = async (pollId, optionIndex) => {
    const poll = polls.find((p) => p.id === pollId);
    if (!poll) return;

    const optionId = poll.options[optionIndex].id;

    try {
      await fetch(
        `${API_BASE_URL}/api/poll/${pollId}/vote?optionId=${optionId}&votedBy=ERAY`,
        {
          method: "POST",
        }
      );

      const response = await fetch(`${API_BASE_URL}/api/poll`);
      const updatedPolls = await response.json();
      setPolls(updatedPolls);
    } catch (err) {
      console.error("Oy verme hatası", err);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const filteredPolls = polls.filter((poll) => {
    const matchUser = filters.user ? poll.createdBy === filters.user : true;
    const matchSprint = filters.sprint ? poll.sprint === filters.sprint : true;
    return matchUser && matchSprint;
  });

  return (
    <div>
      <div style={styles.header}>
        <button onClick={() => setShowFilter(true)} style={styles.filterButton}>
          Filtrele
        </button>
        <span><strong>User:</strong> {filters.user || "Tümü"}</span>
        <span><strong>Sprint:</strong> {filters.sprint || "Tümü"}</span>
      </div>

      <div style={styles.container}>
        <div style={styles.left}>
          <PollList polls={filteredPolls} onVote={handleVote} />
        </div>
        <div style={styles.right}>
          <PollCreator onPollCreated={async () => {
            const response = await fetch(`${API_BASE_URL}/api/poll`);
            const data = await response.json();
            setPolls(data);
          }} />
        </div>
      </div>

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
