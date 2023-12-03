import React, { useState } from "react";
import api from "../api/Api";
import { BaseButton } from "./ButtonComponent";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venueManager: false,
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@stud\.noroff\.no$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const validateInputs = () => {
    const { name, email, password } = formData;
    const errors = [];

    if (!validateEmail(email)) {
      errors.push("Please enter a valid @stud.noroff.no email address.");
    }

    if (name.length < 3) {
      errors.push("Name must be at least 3 characters.");
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleRegister = async () => {
    if (validateInputs()) {
      try {
        const response = await api.registerUser(formData);
        console.log("Registration response:", response);
        navigate("/signin");
      } catch (error) {
        console.error("Registration error:", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center">
      {" "}
      <div className="w-96 p-12 background shadow-md">
        <h1 className="text-3xl">Register user</h1>
        <form className="flex flex-col">
          <label className="flex flex-col">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>

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

          <label className="flex flex-col">
            Avatar URL:
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
            />
          </label>

          <label>
            <input
              type="checkbox"
              name="venueManager"
              checked={formData.venueManager}
              onChange={handleInputChange}
            />
            Venue Manager:
          </label>

          {errorMessages.length > 0 && (
            <div style={{ color: "red" }}>
              {errorMessages.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <BaseButton type="button" onClick={handleRegister}>
            Register
          </BaseButton>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
