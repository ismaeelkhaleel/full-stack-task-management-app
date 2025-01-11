// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/user/register`, userData);  
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/user/login`, userData);  
  return response.data;
};