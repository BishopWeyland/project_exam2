import React, { useState } from "react";
import api from "../api/Api";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await api.loginUser({
        email: formData.email,
        password: formData.password,
      });

      const { accessToken } = response;
      localStorage.setItem("authToken", accessToken);
      console.log("Login response:", response);
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessages(["Invalid email or password. Please try again."]);
    }
  };

  return (
    <div className="w-96 p-12 background drop-shadow-md">
      <h1 className="text-3xl">Login</h1>
      <form className="flex flex-col">
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>

        <label className="flex flex-col">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>

        {errorMessages.length > 0 && (
          <div style={{ color: "red" }}>
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
