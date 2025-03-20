import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Questions from "./Questions";

const SpinWheel = () => {
  // Kişi Çarkı için state
  const [kisiSecenekleri, setKisiSecenekleri] = useState([
    { option: "UÇAN KARPUZ" },
    { option: "MAVİ TOP" },
    { option: "EMEKÇİ" },
    { option: "PEMBE YUNUS" },
    { option: "STEMİZ" },
    { option: "GSİLAH" },
    { option: "BATA" },
  ]);

  // Soru Çarkı için state
  const [soruSecenekleri, setSoruSecenekleri] = useState([
    { option: "Bu sprintte takım olarak|en iyi yaptığımız şey neydi?" },
    { option: "Sence bildiğin|en gereksiz bilgi nedir?" },
    { option: "Sprint boyunca|en büyük zorluk neydi?" },
    { option: "Son zamanlarda öğrendiğin|en ilginç şey nedir?" },
    { option: "Bu sprintte hatalarımızdan|öğrendiğimiz şey neydi?" },
    { option: "Tatilinden en ilginç|bir anını anlat!" },
  ]);

  // Kişi Çarkı için state
  const [kisiDonmeliMi, setKisiDonmeliMi] = useState(false);
  const [kazananKisi, setKazananKisi] = useState(0);
  const [kisiSilAktif, setKisiSilAktif] = useState(false);

  // Soru Çarkı için state
  const [soruDonmeliMi, setSoruDonmeliMi] = useState(false);
  const [kazananSoru, setKazananSoru] = useState(0);
  const [soruSilAktif, setSoruSilAktif] = useState(false);

  // Kişi çarkını döndürme
  const kisiCarkiDondur = () => {
    if (kisiSecenekleri.length === 0) return;
    const rastgeleIndex = Math.floor(Math.random() * kisiSecenekleri.length);
    setKazananKisi(rastgeleIndex);
    setKisiDonmeliMi(true);
    setKisiSilAktif(true);
    setSoruSilAktif(false);
  };

  // Soru çarkını döndürme
  const soruCarkiDondur = () => {
    if (soruSecenekleri.length === 0) return;
    const rastgeleIndex = Math.floor(Math.random() * soruSecenekleri.length);
    setKazananSoru(rastgeleIndex);
    setSoruDonmeliMi(true);
    setSoruSilAktif(true);
    setKisiSilAktif(false);
  };

  // Kişi seçeneğini silme
  const kisiSil = () => {
    if (kisiSilAktif && kisiSecenekleri.length > 0) {
      const guncellenmisKisiler = kisiSecenekleri.filter((_, idx) => idx !== kazananKisi);
      setKisiSecenekleri(guncellenmisKisiler);
      setKisiSilAktif(false);
    }
  };

  // Soru seçeneğini silme
  const soruSil = () => {
    if (soruSilAktif && soruSecenekleri.length > 0) {
      const guncellenmisSorular = soruSecenekleri.filter((_, idx) => idx !== kazananSoru);
      setSoruSecenekleri(guncellenmisSorular);
      setSoruSilAktif(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wheelsRow}>
        {/* Kişi Çarkı */}
        <div style={styles.wheelContainer}>
          <h2>Kişi Çarkı</h2>
          <Wheel
            mustStartSpinning={kisiDonmeliMi}
            prizeNumber={kazananKisi}
            data={kisiSecenekleri}
            backgroundColors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8AFF8A"]}
            textColors={["#ffffff"]}
            outerBorderWidth={1}
            innerBorderWidth={1}
            outerBorderColor={"#FF6384"}
            innerBorderColor={"#FF6384"}
            onStopSpinning={() => setKisiDonmeliMi(false)}
          />
          <button style={styles.spinButton} onClick={kisiCarkiDondur}>
            Spin
          </button>
          <button
            style={{
              ...styles.deleteButton,
              backgroundColor: kisiSilAktif ? "#bdbdbd" : "#e0e0e0",
              cursor: kisiSilAktif ? "pointer" : "not-allowed",
            }}
            disabled={!kisiSilAktif}
            onClick={kisiSil}
          >
            Delete
          </button>
        </div>

        {/* Soru Çarkı */}
        <div style={styles.wheelContainer}>
          <h2>Soru Çarkı</h2>
          <Wheel
            mustStartSpinning={soruDonmeliMi}
            prizeNumber={kazananSoru}
            data={soruSecenekleri}
            backgroundColors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8AFF8A"]}
            textColors={["#ffffff"]}
            outerBorderWidth={1}
            innerBorderWidth={1}
            outerBorderColor={"#36A2EB"}
            innerBorderColor={"#36A2EB"}
            fontSize={9}
            textDistance={60}
            perpendicularText={true}
            onStopSpinning={() => setSoruDonmeliMi(false)}
          />

          <button style={styles.spinButton} onClick={soruCarkiDondur}>
            Spin
          </button>
          <button
            style={{
              ...styles.deleteButton,
              backgroundColor: soruSilAktif ? "#bdbdbd" : "#e0e0e0",
              cursor: soruSilAktif ? "pointer" : "not-allowed",
            }}
            disabled={!soruSilAktif}
            onClick={soruSil}
          >
            Delete
          </button>
        </div>

        {/* Sorular Bileşeni */}
        <div style={styles.questionsContainer}>
          <Questions questionOptions={soruSecenekleri} setQuestionOptions={setSoruSecenekleri} />
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
