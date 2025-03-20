import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Questions from "./Questions";


const SpinWheel = () => {
  // Kişi Çarkı için state
  const [personOptions, setPersonOptions] = useState([
    { option: "UÇAN KARPUZ" },
    { option: "MAVİ TOP" },
    { option: "EMEKÇİ" },
    { option: "PEMBE YUNUS" },
    { option: "STEMİZ" },
    { option: "GSİLAH" },
    { option: "BATA" },
  ]);

  // Soru Çarkı için state
  const [questionOptions, setQuestionOptions] = useState([
    { option: "Bu sprintte takım olarak|en iyi yaptığımız şey neydi?" },
    { option: "Sence bildiğin|en gereksiz bilgi nedir?" },
    { option: "Sprint boyunca|en büyük zorluk neydi?" },
    { option: "Son zamanlarda öğrendiğin|en ilginç şey nedir?" },
    { option: "Bu sprintte hatalarımızdan|öğrendiğimiz şey neydi?" },
    { option: "Tatilinden en ilginç|bir anını anlat!" },
  ]);
  

  // Kişi Çarkı için state
  const [mustSpinPerson, setMustSpinPerson] = useState(false);
  const [prizeNumberPerson, setPrizeNumberPerson] = useState(0);
  const [isPersonDeleteActive, setIsPersonDeleteActive] = useState(false);

  // Soru Çarkı için state
  const [mustSpinQuestion, setMustSpinQuestion] = useState(false);
  const [prizeNumberQuestion, setPrizeNumberQuestion] = useState(0);
  const [isQuestionDeleteActive, setIsQuestionDeleteActive] = useState(false);

  // Kişi çarkını başlat
  const handleSpinPerson = () => {
    if (personOptions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * personOptions.length);
    setPrizeNumberPerson(randomIndex);
    setMustSpinPerson(true);
    setIsPersonDeleteActive(true);
    setIsQuestionDeleteActive(false);
  };

  // Soru çarkını başlat
  const handleSpinQuestion = () => {
    if (questionOptions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * questionOptions.length);
    setPrizeNumberQuestion(randomIndex);
    setMustSpinQuestion(true);
    setIsQuestionDeleteActive(true);
    setIsPersonDeleteActive(false);
  };

  // Kişi seçeneğini silme fonksiyonu
  const handleDeletePerson = () => {
    if (isPersonDeleteActive && personOptions.length > 0) {
      const updatedPersons = personOptions.filter((_, idx) => idx !== prizeNumberPerson);
      setPersonOptions(updatedPersons);
      setIsPersonDeleteActive(false);
    }
  };

  // Soru seçeneğini silme fonksiyonu
  const handleDeleteQuestion = () => {
    if (isQuestionDeleteActive && questionOptions.length > 0) {
      const updatedQuestions = questionOptions.filter((_, idx) => idx !== prizeNumberQuestion);
      setQuestionOptions(updatedQuestions);
      setIsQuestionDeleteActive(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wheelsRow}>
        {/* Kişi Çarkı */}
        <div style={styles.wheelContainer}>
          <h2>Kişi Çarkı</h2>
          <Wheel
            mustStartSpinning={mustSpinPerson}
            prizeNumber={prizeNumberPerson}
            data={personOptions}
            backgroundColors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8AFF8A"]}
            textColors={["#ffffff"]}
            outerBorderWidth={1}
            innerBorderWidth={1}
            outerBorderColor={"#FF6384"}
            innerBorderColor={"#FF6384"}
            onStopSpinning={() => setMustSpinPerson(false)}
          />
          <button style={styles.spinButton} onClick={handleSpinPerson}>
            Spin
          </button>
          <button
            style={{
              ...styles.deleteButton,
              backgroundColor: isPersonDeleteActive ? "#bdbdbd" : "#e0e0e0",
              cursor: isPersonDeleteActive ? "pointer" : "not-allowed",
            }}
            disabled={!isPersonDeleteActive}
            onClick={handleDeletePerson}
          >
            Delete
          </button>
        </div>
{/* Soru Çarkı */}
<div style={styles.wheelContainer}>
  <h2>Soru Çarkı</h2>
  <Wheel
    mustStartSpinning={mustSpinQuestion}
    prizeNumber={prizeNumberQuestion}
    data={questionOptions}
    backgroundColors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8AFF8A"]}
    textColors={["#ffffff"]}
    outerBorderWidth={1}
    innerBorderWidth={1}
    outerBorderColor={"#36A2EB"}
    innerBorderColor={"#36A2EB"}
    fontSize={9}
    textDistance={60}
    perpendicularText={true}
    onStopSpinning={() => setMustSpinQuestion(false)}
    textRender={(text) =>
      text.split("|").map((line, index) => (
        <tspan key={index} x="0" dy={index === 0 ? 0 : 12}>
          {line}
        </tspan>
      ))
    }
  />

  

  <button style={styles.spinButton} onClick={handleSpinQuestion}>
    Spin
  </button>
  <button
    style={{
      ...styles.deleteButton,
      backgroundColor: isQuestionDeleteActive ? "#bdbdbd" : "#e0e0e0",
      cursor: isQuestionDeleteActive ? "pointer" : "not-allowed",
    }}
    disabled={!isQuestionDeleteActive}
    onClick={handleDeleteQuestion}
  >
    Delete
  </button>
</div>
{/* Sorular Sayfasını Buraya Entegre Ettik */}
<div style={styles.questionsContainer}>
    <Questions questionOptions={questionOptions} setQuestionOptions={setQuestionOptions} />
  </div>
      </div>
      
    </div>
  );
};

// Stil Ayarları
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  wheelsRow: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    gap: "100px",
  },
  wheelContainer: {
    textAlign: "center",
    position: "relative",
  },
  spinButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#FF5733",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    opacity: 1,
  },
  deleteButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    color: "#555",
    width: "100px",
    backgroundColor: "#e0e0e0",
    cursor: "not-allowed",
  },
};

export default SpinWheel;