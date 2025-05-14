// src/pages/PollListPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const PollListPage = () => {
  const [polls, setPolls] = useState([]);
  const [groupedPolls, setGroupedPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const maxOptions = 5;

  const currentUser = JSON.parse(localStorage.getItem("user"))?.username;
  const currentSprint = "Sprint 12";

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await axios.get("https://localhost:7048/api/poll/all");
      setPolls(res.data);
      groupPolls(res.data);
    } catch (err) {
      console.error("Anket verisi alınamadı:", err);
    }
  };

  const groupPolls = (data) => {
    const grouped = {};
    data.forEach((poll) => {
      const key = `${poll.question}_${poll.createdBy}_${poll.sprintLabel}`;
      if (!grouped[key]) {
        grouped[key] = {
          question: poll.question,
          createdBy: poll.createdBy,
          sprintLabel: poll.sprintLabel,
          options: [],
          votes: [],
        };
      }
      if (!grouped[key].options.includes(poll.optionText)) {
        grouped[key].options.push(poll.optionText);
      }
      if (poll.votedBy) {
        grouped[key].votes.push({
          user: poll.votedBy,
          option: poll.optionText,
        });
      }
    });
    setGroupedPolls(Object.values(grouped));
  };

  const handleVote = async (question, sprintLabel, optionText) => {
    try {
      const vote = {
        question,
        sprintLabel,
        optionText,
        votedBy: currentUser,
      };
      await axios.post("https://localhost:7048/api/poll/vote", vote);
      fetchPolls();
    } catch (err) {
      alert(err.response?.data || "Oy kullanılamadı.");
    }
  };

  const handleAddOption = () => {
    if (options.length < maxOptions) {
      setOptions([...options, ""]);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
  };

  const handleCreatePoll = async () => {
    if (!question.trim() || options.some((o) => !o.trim())) {
      alert("Soru ve tüm şıklar doldurulmalıdır.");
      return;
    }

    const payload = {
      question: question.trim(),
      options: options.map((o) => o.trim()),
      createdBy: currentUser,
      sprintLabel: currentSprint,
    };

    try {
      await axios.post("https://localhost:7048/api/poll/create", payload);
      resetForm();
      fetchPolls();
    } catch (err) {
      alert("Anket oluşturulamadı.");
    }
  };

  const renderPoll = (poll) => {
    const optionCounts = {};
    const votersByOption = {};

    poll.votes.forEach((vote) => {
      optionCounts[vote.option] = (optionCounts[vote.option] || 0) + 1;
      if (!votersByOption[vote.option]) votersByOption[vote.option] = [];
      votersByOption[vote.option].push(vote.user);
    });

    const userAlreadyVoted = poll.votes.some((v) => v.user === currentUser);

    return (
      <div key={poll.question + poll.createdBy} style={styles.pollCard}>
        <strong>{poll.question}</strong>
        <p>
          <b>Sprint:</b> {poll.sprintLabel} | <b>Oluşturan:</b>{" "}
          {poll.createdBy}
        </p>

        {poll.options.map((opt) => (
          <div key={opt} style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="radio"
                name={poll.question}
                disabled={userAlreadyVoted}
                onClick={() => handleVote(poll.question, poll.sprintLabel, opt)}
              />
              {opt}
            </label>{" "}
            <span style={{ fontWeight: "bold" }}>
              {optionCounts[opt] || 0}
            </span>

            {votersByOption[opt]?.map((user, idx) => (
              <span key={idx} style={styles.avatar}>
                {user[0].toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", gap: "40px", padding: "30px" }}>
      <div style={{ flex: 2 }}>
        <h2>Anket Listesi</h2>
        {groupedPolls.map((poll) => renderPoll(poll))}
      </div>

      <div style={styles.createBox}>
        <h3>Yeni Anket Oluştur</h3>
        <input
          type="text"
          placeholder="Soru yazınız..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={styles.input}
        />
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Seçenek ${index + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[index] = e.target.value;
              setOptions(newOpts);
            }}
            style={styles.input}
          />
        ))}
        {options.length < maxOptions && (
          <button onClick={handleAddOption}>+ Şık Ekle</button>
        )}
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleCreatePoll} style={{ marginRight: "10px" }}>
            ✅
          </button>
          <button onClick={resetForm}>🗑</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pollCard: {
    background: "#f6f7f9",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  createBox: {
    flex: 1,
    background: "#faf2ff",
    padding: "20px",
    borderRadius: "10px",
  },
  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
  },
  avatar: {
    display: "inline-block",
    marginLeft: "5px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "20px",
  },
};

export default PollListPage;
