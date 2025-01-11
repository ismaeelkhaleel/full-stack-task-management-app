import React, { useContext } from 'react';
import AuthForm from './AuthForm';
import { loginUser } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await loginUser(formData);
      console.log('Login response:', response);

      if (response.token) {
        localStorage.setItem('token', response.token); // Save JWT token
        login(response.user); // Update user context
        alert('Login successful!');
        navigate('/item/menu'); // Redirect to menu page after login
      } else {
        console.error('No token in response:', response);
        alert('Login failed. Invalid response from server.');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
        'Login failed. Please check your username and password.'
      );
    }
  };

  return (
    <div>
      <AuthForm
        fields={['username', 'password']}
        onSubmit={handleLogin}
        buttonText="Login"
      />
    </div>
  );
};

export default Login;
