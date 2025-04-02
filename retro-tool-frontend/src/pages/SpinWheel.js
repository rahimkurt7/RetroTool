import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Questions from "./Questions";
import useSound from "use-sound";
import spinSound from "../assets/cark.mp3";

const renkler = ["#ff7675", "#74b9ff", "#55efc4", "#ffeaa7", "#fd79a8", "#81ecec", "#fab1a0", "#dfe6e9"];

const SpinWheel = () => {
  const [kisiSecenekleri, setKisiSecenekleri] = useState([
    { option: "UÇAN KARPUZ" },
    { option: "MAVİ TOP" },
    { option: "EMEKÇİ" },
    { option: "PEMBE YUNUS" },
    { option: "STEMİZ" },
    { option: "GSİLAH" },
    { option: "BATA" },
  ]);

  const [soruSecenekleri, setSoruSecenekleri] = useState([
    { option: "Bu sprintte takım olarak en iyi yaptığımız şey neydi?" },
    { option: "Sence bildiğin en gereksiz bilgi nedir?" },
    { option: "Sprint boyunca en büyük zorluk neydi?" },
    { option: "Son zamanlarda öğrendiğin en ilginç şey nedir?" },
    { option: "Bu sprintte hatalarımızdan öğrendiğimiz şey neydi?" },
    { option: "Tatilinden en ilginç bir anını anlat!" },
  ]);

  const [isSpinning, setIsSpinning] = useState(false);
  const [kazananKisi, setKazananKisi] = useState(null);
  const [kazananSoru, setKazananSoru] = useState(null);
  const [popupAcik, setPopupAcik] = useState(false);

  const [play] = useSound(spinSound);

  const carklariDondur = () => {
    if (kisiSecenekleri.length === 0 || soruSecenekleri.length === 0) return;

    const kisiIndex = Math.floor(Math.random() * kisiSecenekleri.length);
    const soruIndex = Math.floor(Math.random() * soruSecenekleri.length);
    setKazananKisi(kisiIndex);
    setKazananSoru(soruIndex);
    setIsSpinning(true);
    play(); // sesi başlat
  };

  let stopCount = 0;

  const handleStopSpinning = () => {
    stopCount += 1;
    if (stopCount === 2) {
      stopCount = 0;
      setTimeout(() => {
        setIsSpinning(false);
        setPopupAcik(true);
      }, 300);
    }
  };

  const handleDeleteFromPopup = () => {
    const updatedKisiler = kisiSecenekleri.filter((_, i) => i !== kazananKisi);
    const updatedSorular = soruSecenekleri.filter((_, i) => i !== kazananSoru);
    setKisiSecenekleri(updatedKisiler);
    setSoruSecenekleri(updatedSorular);
    setPopupAcik(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.wheelsRow}>
        <Wheel
          mustStartSpinning={isSpinning}
          prizeNumber={kazananKisi ?? 0}
          data={kisiSecenekleri}
          onStopSpinning={handleStopSpinning}
          backgroundColors={renkler}
          textColors={["#2d3436"]}
          fontSize={18}
          textDistance={60}
          
          width={300}
        outerBorderColor="transparent" // siyah kenarlık kalktı
         outerBorderWidth={0}           // kalınlık 0
          innerBorderColor="transparent"
          innerBorderWidth={0}
        />

        <Wheel
          mustStartSpinning={isSpinning}
          prizeNumber={kazananSoru ?? 0}
          data={soruSecenekleri.map((_, i) => ({ option: `${i + 1}` }))}
          onStopSpinning={handleStopSpinning}
          backgroundColors={renkler}
          textColors={["#2d3436"]}
          fontSize={14}
          textDistance={60}
          
          width={300}
          outerBorderColor="transparent"
          outerBorderWidth={0}
          innerBorderColor="transparent"
          innerBorderWidth={0}
        
        />

        <div style={styles.questionsContainer}>
          <Questions
            questionOptions={soruSecenekleri}
            setQuestionOptions={setSoruSecenekleri}
          />
          <button
            style={{
              ...styles.spinButton,
              backgroundColor: isSpinning ? "#D81B60" : "#f8c9f8",
              color: isSpinning ? "#f8c9f8" : "#D81B60",
              transition: "all 0.3s",
            }}
            onClick={carklariDondur}
            disabled={isSpinning}
            onMouseEnter={(e) => {
              if (!isSpinning) e.target.style.backgroundColor = "#ff99cc";
            }}
            onMouseLeave={(e) => {
              if (!isSpinning) e.target.style.backgroundColor = "#f8c9f8";
            }}
          >
            SPIN
          </button>
        </div>
      </div>

      {popupAcik && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <button style={styles.closeButton} onClick={() => setPopupAcik(false)}>✖</button>
            <h3>🎉 Sonuçlar</h3>
            <p><b>Kişi:</b> <span style={{ color: "#d63031" }}>{kisiSecenekleri[kazananKisi]?.option}</span></p>
            <p><b>Soru:</b> <span style={{ color: "#0984e3" }}>{kazananSoru + 1}. {soruSecenekleri[kazananSoru]?.option}</span></p>
            <button style={styles.deleteButton} onClick={handleDeleteFromPopup}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 },
  wheelsRow: { display: "flex", gap: 50, alignItems: "center" },
  questionsContainer: { display: "flex", flexDirection: "column", alignItems: "center" },
  spinButton: {
    marginTop: 20,
    padding: "12px 40px",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  popup: {
    position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    backgroundColor: "#fff", boxShadow: "0 0 15px rgba(0,0,0,0.4)",
    padding: 30, borderRadius: 12, zIndex: 999,
  },
  popupContent: { textAlign: "center" },
  closeButton: {
    position: "absolute", top: 10, right: 10,
    background: "none", border: "none", fontSize: 20, cursor: "pointer"
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: "#ff4d4d",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default SpinWheel;
