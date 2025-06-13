import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Optional: for styling

const Home = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/auth"); // This should match the route you set for AuthPage
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Platform</h1>
      <p>Your one-stop destination.</p>
      <button className="signin-btn" onClick={handleSignInClick}>
        Sign In / Sign Up
      </button>
    </div>
  );
};

export default Home;
