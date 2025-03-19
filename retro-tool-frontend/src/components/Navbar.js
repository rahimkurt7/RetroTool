import React from "react";
import logo from "../assets/bilgiyön-Logo.png"; // Logoyu içe aktar

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* LOGO */}
      <img src={logo} alt="BilgiYön Yazılım" style={styles.logo} />
      
      {/* Butonlar */}
      <div style={styles.buttons}>
        <button style={styles.button}>Spin a Wheel</button>
        <button style={styles.button}>Start a Poll</button>
        <button style={styles.button}>Teams</button>
        <button style={styles.button}>Export</button>
        <button style={styles.button}>Graphs</button>
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
    height: "50px", // Logo boyutunu ayarladık
    objectFit: "contain",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
  loginButton: {
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#0a74da",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;
