// AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if isLoggedIn is present in local storage
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const [userId, setUserId] = useState(() => {
    // Check if userId is present in local storage
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? storedUserId : null;
  });

  // Update localStorage when authentication status or user ID changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
