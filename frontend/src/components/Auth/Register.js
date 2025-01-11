// src/components/Auth/Register.js
import React from 'react';
import AuthForm from './AuthForm';
import { registerUser } from '../../services/authService';
import {useNavigate} from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const response = await registerUser(formData);
      alert('Registration successful! Please login.');
      console.log(response);
      navigate('/user/login');
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed.');
    }
  };

  return (
    <div>
      <AuthForm
        fields={['email', 'username', 'password']} // Three input fields
        onSubmit={handleRegister}
        buttonText="Register"
      />
    </div>
  );
};

export default Register;
