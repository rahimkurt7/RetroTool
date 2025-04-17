import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState("");

  const guestNames = [
    "Pembe Yunus",
    "Zıplayan Fasulye",
    "Uçan Karpuz",
    "Dans Eden Tost",
    "Pijamalı Dinozor"
  ];

  const assignRandomGuestName = () => {
    const randomName = guestNames[Math.floor(Math.random() * guestNames.length)];
    setGuestName(randomName);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("https://localhost:7048/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify({ username, type: "user" }));
        alert(data.message);
        onClose();
      } else {
        setError(data.message || "Giriş başarısız.");
      }
    } catch (error) {
      setError("Sunucuya bağlanılamadı.");
    }
  };

  const handleGuestLogin = () => {
    if (!guestName.trim()) {
      setError("Anonim kullanıcı adı boş olamaz.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username: guestName, type: "guest" }));
    alert(`Anonim olarak giriş yapıldı: ${guestName}`);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>Sign In</h3>

        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isGuest}
          style={{
            ...styles.input,
            backgroundColor: isGuest ? "#f0f0f0" : "#fff",
            cursor: isGuest ? "not-allowed" : "text",
          }}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isGuest}
          style={{
            ...styles.input,
            backgroundColor: isGuest ? "#f0f0f0" : "#fff",
            cursor: isGuest ? "not-allowed" : "text",
          }}
        />

        <button
          onClick={handleSignIn}
          style={{
            ...styles.signInButton,
            backgroundColor: isGuest ? "#ccc" : "#00d084",
            cursor: isGuest ? "not-allowed" : "pointer",
          }}
          disabled={isGuest}
        >
          Sign In
        </button>

        <label style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={isGuest}
            onChange={(e) => {
              setIsGuest(e.target.checked);
              if (e.target.checked) {
                assignRandomGuestName();
              } else {
                setGuestName("");
              }
            }}
          />
          <span style={{ marginLeft: "8px" }}>Continue as a guest</span>
        </label>

        <input
          type="text"
          placeholder="Anonim Kullanıcı Adı"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          disabled={!isGuest}
          style={{
            ...styles.input,
            backgroundColor: isGuest ? "#fff" : "#f0f0f0",
            cursor: isGuest ? "text" : "not-allowed",
          }}
        />

        <button
          onClick={handleGuestLogin}
          style={{
            ...styles.signInButton,
            backgroundColor: isGuest ? "#00d084" : "#ccc",
            cursor: isGuest ? "pointer" : "not-allowed",
          }}
          disabled={!isGuest}
        >
          Sign In as a Guest
        </button>

        {error && (
          <div style={styles.errorBox}>
            <p><strong>Uyarı</strong></p>
            <p>{error}</p>
            <button onClick={() => setError("")} style={styles.errorButton}>Tamam</button>
          </div>
        )}

        <button onClick={onClose} style={styles.closeButton}>
          Kapat
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    width: "300px",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  signInButton: {
    width: "100%",
    padding: "10px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px",
  },
  errorBox: {
    backgroundColor: "#ffe6e6",
    color: "#b00020",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    textAlign: "left",
  },
  errorButton: {
    marginTop: "5px",
    backgroundColor: "#b00020",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "transparent",
    fontSize: "16px",
    cursor: "pointer",
    color: "#aaa",
  },
};

export default LoginPopup;
