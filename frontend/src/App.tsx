import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatInterface from "./components/Interface";
import Login from "./components/Login";
import Register from "./components/register";
import { ThemeProvider } from "./components/themeContext";
import "./App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => {}} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
