// Logout.jsx

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Logout = () => {
  const { setIsLoggedIn, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Update authentication status and user ID to null
    setIsLoggedIn(false);
    setUserId(null);

    // Redirect to home page after logout
    navigate("/");
  }, [setIsLoggedIn, setUserId, navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
