import React, { useState, useContext } from "react";
import logo from "../assets/bilgiyön-Logo.png";
import { Link } from "react-router-dom";
import OptionsPanel from "./OptionsPanel";
import { TeamsContext } from "../context/TeamsContext";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { teamsLink } = useContext(TeamsContext);

  const handleButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  const handleTeamsClick = () => {
    if (teamsLink) {
      window.open(teamsLink, "_blank");
    }
  };

  return (
    <>
      <nav style={styles.navbar}>
        <img src={logo} alt="BilgiYön Yazılım" style={styles.logo} />

        <div style={styles.buttons}>
          {/* ✅ Spin a Wheel */}
          <Link to="/spin-wheel" style={{ textDecoration: "none" }}>
            <button
              style={{
                ...styles.button,
                backgroundColor: isClicked ? "#D81B60" : "#f8c9f8",
                color: isClicked ? "#f8c9f8" : "black",
              }}
              onClick={handleButtonClick}
            >
              Spin a Wheel
            </button>
          </Link>

          {/* ✅ Start a Poll */}
          <Link to="/start-poll" style={{ textDecoration: "none" }}>
            <button style={{ ...styles.button, backgroundColor: "#ffb347", color: "white" }}>
              Start a Poll
            </button>
          </Link>

          {/* ✅ Teams (sadece link varsa çalışır) */}
          <button
            onClick={handleTeamsClick}
            disabled={!teamsLink}
            style={{
              ...styles.button,
              backgroundColor: "#5271ff",
              color: "white",
              opacity: teamsLink ? 1 : 0.5,
              cursor: teamsLink ? "pointer" : "not-allowed",
            }}
          >
            Teams
          </button>

          {/* ✅ Export (şimdilik pasif) */}
          <Link to="/export" style={{ textDecoration: "none" }}>
            <button style={{ ...styles.button, backgroundColor: "#8af596" }}>
              Export
            </button>
          </Link>

          {/* ✅ Graphs (şimdilik pasif) */}
          <Link to="/graphs" style={{ textDecoration: "none" }}>
            <button style={{ ...styles.button, backgroundColor: "#d18aff" }}>
              Graphs
            </button>
          </Link>

          {/* ✅ Options açılır pencere */}
          <button
            style={styles.optionsButton}
            onClick={() => setShowOptions(true)}
          >
            ⚙ Options
          </button>

          {/* ✅ Login sayfası yönlendirmesi */}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={styles.loginButton}>Login</button>
          </Link>
        </div>
      </nav>

      {/* ✅ Options panel */}
      {showOptions && <OptionsPanel onClose={() => setShowOptions(false)} />}
    </>
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
