// Login.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

const Login = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);
  const { setIsLoggedIn, setUserId } = useContext(AuthContext); // Access setIsLoggedIn and setUserId from AuthContext

  // State variables for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // User logged in successfully
        setIsLoggedIn(true); // Set isLoggedIn to true
        const { userId } = await response.json(); // Assuming the server returns the userId upon successful login
        setUserId(userId); // Set the userId
        navigate("/");
      } else {
        // Error occurred, display error messages
        const errorData = await response.json();
        setErrorMessages(errorData.errors || ["Login failed"]);
      }
    } catch (error) {
      setErrorMessages(["Login failed. Please try again later."]);
    }
  };

  return (
    <div className="container">
      <div className="col-md-6 col-sm-8 col-12 mx-auto pb-5">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center">Login</h2>
            {errorMessages.length > 0 && (
              <div className="alert alert-danger alert-sm" role="alert">
                {errorMessages.map((error, index) => (
                  <small className="d-block" key={index}>
                    {error}
                  </small>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
