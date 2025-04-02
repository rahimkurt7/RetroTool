import React, { useState } from "react";

const Questions = ({ questionOptions, setQuestionOptions }) => {
  const [newQuestion, setNewQuestion] = useState("");

  const handleAddQuestion = () => {
    if (newQuestion.trim() === "") return;
    const updatedQuestions = [...questionOptions, { option: newQuestion }];
    setQuestionOptions(updatedQuestions);
    setNewQuestion("");
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = questionOptions.filter((q) => !q.checked);
    setQuestionOptions(updatedQuestions);
  };

  const toggleCheck = (index) => {
    const updatedQuestions = questionOptions.map((q, i) =>
      i === index ? { ...q, checked: !q.checked } : q
    );
    setQuestionOptions(updatedQuestions);
  };

  return (
    <div style={styles.container}>
      <h2>Questions</h2>
      <div style={styles.questionList}>
        {questionOptions.map((q, index) => (
          <div key={index} style={styles.questionItem}>
            <input
              type="checkbox"
              checked={q.checked || false}
              onChange={() => toggleCheck(index)}
            />
            <span><b>{index + 1}.</b> {q.option}</span>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Add a question..."
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddQuestion} style={styles.addButton}>
        Add
      </button>
      <button onClick={handleDeleteQuestion} style={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  questionList: {
    maxHeight: "300px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  questionItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "5px",
    fontSize: "14px",
  },
  input: {
    width: "80%",
    padding: "5px",
    marginBottom: "5px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "4px",
    width: "50px",
    height: "30px",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "4px",
    width: "70px",
    height: "30px",
  },
};

export default Questions;
