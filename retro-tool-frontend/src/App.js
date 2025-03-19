import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./components/Navbar";
import Board from "./components/Board"; // Board bileşeni eklendi
import "./styles.css";


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Board />} /> {/* Board ana sayfa oldu */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
