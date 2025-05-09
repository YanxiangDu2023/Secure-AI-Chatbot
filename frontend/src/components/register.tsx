import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import unrwaLogo from "../assets/unrwa-logo.png";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
   
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#e5f4ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <img
          src={unrwaLogo}
          alt="UNRWA Logo"
          style={{ width: "140px", marginBottom: "2rem" }}
        />
        <h2 style={{ color: "#0072bc", marginBottom: "1.5rem" }}>Register</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "#0072bc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
        >
          Register
        </button>
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            border: "none",
            color: "#0072bc",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}
