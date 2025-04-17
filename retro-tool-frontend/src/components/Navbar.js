import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/bilgiyön-Logo.png";
import { Link } from "react-router-dom";
import OptionsPanel from "./OptionsPanel";
import LoginPopup from "./LoginPopup";
import { TeamsContext } from "../context/TeamsContext";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [user, setUser] = useState(null); //  Kullanıcıyı state'e al

  const { teamsLink } = useContext(TeamsContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [showLoginPopup]); // popup kapanınca güncelle

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // sayfayı yenile
  };

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
          {/* ✅ Hoş geldin mesajı */}
          {user && (
            <span style={{ fontWeight: "bold", marginRight: "25px", marginLeft:"50px" }}>
              Hoş geldin, {user.username}
            </span>
          )}

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

          {/*  Start a Poll */}
          <Link to="/start-poll" style={{ textDecoration: "none" }}>
            <button style={{ ...styles.button, backgroundColor: "#ffb347", color: "white" }}>
              Start a Poll
            </button>
          </Link>

          {/*  Teams */}
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

          {/*  Export */}
          <Link to="/export" style={{ textDecoration: "none" }}>
            <button style={{ ...styles.button, backgroundColor: "#8af596" }}>
              Export
            </button>
          </Link>

          {/* Graphs */}
          <Link to="/graphs" style={{ textDecoration: "none" }}>
            <button style={{ ...styles.button, backgroundColor: "#d18aff" }}>
              Graphs
            </button>
          </Link>

          {/*  Options */}
          <button
            style={styles.optionsButton}
            onClick={() => setShowOptions(true)}
          >
            ⚙ Options
          </button>

          {/* ✅ Kullanıcı yoksa Login butonu, varsa Logout butonu */}
          {!user ? (
            <button style={styles.loginButton} onClick={() => setShowLoginPopup(true)}>
              Login
            </button>
          ) : (
            <button
              style={{
                ...styles.loginButton,
                backgroundColor: "#f44336"
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ✅ Options panel */}
      {showOptions && <OptionsPanel onClose={() => setShowOptions(false)} />}

      {/* ✅ Login popup */}
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
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
