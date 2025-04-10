import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Navbar from "./components/Navbar";
import Board from "./components/Board";
import HomePage from "./pages/HomePage";
import Questions from "./pages/Questions";
import SpinWheel from "./pages/SpinWheel";
import CreatePollPage from "./pages/CreatePollPage";
import ExportPage from "./pages/ExportPage";
import GraphsPage from "./pages/GraphsPage";

import { TeamsProvider } from "./context/TeamsContext";

import "./styles.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TeamsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/spin-wheel" element={<SpinWheel />} />
            <Route path="/start-poll" element={<CreatePollPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/graphs" element={<GraphsPage />} />
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </Router>
      </TeamsProvider>
    </DndProvider>
  );
}

export default App;
