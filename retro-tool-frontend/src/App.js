import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import HomePage from "./pages/HomePage";
import Questions from "./pages/Questions";
import SpinWheel from "./pages/SpinWheel";  // ✅ Kendi oluşturduğun SpinWheel bileşeni çağırıldı
import "./styles.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Questions />} />
          <Route path="/spin-wheel" element={<SpinWheel />} />  {/* ✅ Route içinde kendi bileşenin kullanıldı */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
