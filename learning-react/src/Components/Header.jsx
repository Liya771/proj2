import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="logo">🌐 MySite</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/auth">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
