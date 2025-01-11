import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Replace with the actual path of your AuthContext

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext); // Check if user is logged in

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      {!isAuthenticated ? (
        <>
          <p>You need to login to explore this website.</p>
          <Link to="/user/login" className="btn btn-outline-success" style={{ margin: '10px' }}>
            Login
          </Link>
          <Link to="/user/register" className="btn btn-outline-success" style={{ margin: '10px' }}>
            Register
          </Link>
        </>
      ) : (
        <>
          <p>Welcome back! Explore the menu below.</p>
          <Link to="/item/menu" className="btn btn-outline-primary" style={{ margin: '10px' }}>
            Menu
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
