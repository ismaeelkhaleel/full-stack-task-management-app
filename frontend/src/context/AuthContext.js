// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Install with npm install jwt-decode

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData); // Set user state
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('token'); // Remove token
  };

  // Check if the user is logged in on page reload
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        setUser({ username: decodedToken.username, id: decodedToken.id }); // Extract user details
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Clear invalid token
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
