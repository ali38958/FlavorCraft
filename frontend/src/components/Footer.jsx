import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">🍳</span>
              <span>Flavor<span className="logo-accent">Craft</span></span>
            </Link>
            <p className="footer-tagline">
              A curated community recipe platform celebrating the joy of cooking, sharing, and savoring homemade cuisine from passionate chefs worldwide.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Browse All Recipes</Link></li>
              <li><Link to="/recipes?category=Breakfast">Breakfast Specials</Link></li>
              <li><Link to="/recipes?category=Vegan">Plant-Based / Vegan</Link></li>
              <li><Link to="/recipes?category=Desserts">Decadent Desserts</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Community</h4>
            <ul className="footer-links">
              <li><Link to="/submit">Submit a Recipe</Link></li>
              <li><Link to="/profile">Chef Profile</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} FlavorCraft. Selection Task Recipe Sharing Platform. Built with React & Express.
          </p>
          <div className="footer-badges">
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">Express API</span>
            <span className="tech-tag">JWT Auth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
