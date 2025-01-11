// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Menu from './components/Menu/Menu';
import OrderHistory from './components/Orders/OrderHistory';
import MyMenu from './components/Menu/MyMenu';
import Home from './components/Home/Home';
// Dummy components for additional pages (replace with actual components later)

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/item/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myOrders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addByMe"
            element={
              <ProtectedRoute>
                <MyMenu />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Home />} />
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
