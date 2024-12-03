import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirect
import "./Register.css"; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Redirect back to Login.js after successful registration
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#2c2936", height: "100vh", padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Courier New",
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#f9ffba",
          }}
        >
          Register New Account
        </h1>
      </div>
      <div className="container">
        <div className="register-card">
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && (
                <p style={{ color: "red", fontSize: "0.9rem", margin: "10px 0" }}>
                  {error}
                </p>
              )}
              <div className="submit-btn">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
