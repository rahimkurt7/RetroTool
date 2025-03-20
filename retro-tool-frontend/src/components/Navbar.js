import React, { useState } from "react";
import logo from "../assets/bilgiyön-Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Buton tıklanma durumunu kontrol eden state
  const [isClicked, setIsClicked] = useState(false);

  // Butona tıklandığında state değiştir
  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000); // 2 saniye sonra geri dön
  };

  return (
    <nav style={styles.navbar}>
      {/* LOGO */}
      <img src={logo} alt="BilgiYön Yazılım" style={styles.logo} />

      {/* Butonlar */}
      <div style={styles.buttons}>
        <button
          style={{
            ...styles.button,
            backgroundColor: isClicked ? "#D81B60" : "#f8c9f8",
            color: isClicked ? "#f8c9f8" : "black",
          }}
          onClick={handleButtonClick}
        >
          <Link
            to="/spin-wheel"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Spin a Wheel
          </Link>
        </button>
        <button style={{ ...styles.button, backgroundColor: "#ffb366" }}>
          Start a Poll
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#5271ff", color: "white" }}
        >
          Teams
        </button>
        <button style={{ ...styles.button, backgroundColor: "#8af596" }}>
          Export
        </button>
        <button style={{ ...styles.button, backgroundColor: "#d18aff" }}>
          Graphs
        </button>
        <button style={styles.optionsButton}>⚙ Options</button>
        <button style={styles.loginButton}>Login</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#fff",
    borderBottom: "2px solid #ddd",
  },
  logo: {
    height: "50px",
    objectFit: "contain",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  button: {
    padding: "5px 15px",
    border: "none",
    borderRadius: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  optionsButton: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
  loginButton: {
    padding: "5px 15px",
    border: "none",
    borderRadius: "20px",
    backgroundColor: "#00d084",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Navbar;
