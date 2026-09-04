import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Top-Left Logo (PDF Requirement 1.a) */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🍳</span>
          <span className="logo-text">
            Flavor<span className="logo-accent">Craft</span>
          </span>
        </Link>

        {/* Search Bar in Header */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
          />
        </form>

        {/* Desktop Navigation Links (PDF Requirement 1.a: Home, Browse Recipes, Submit Recipe, User Profile) */}
        <nav className="navbar-nav desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/recipes"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Browse Recipes
          </NavLink>

          <NavLink
            to="/submit"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Submit Recipe
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            User Profile
          </NavLink>
        </nav>

        {/* User Auth Actions */}
        <div className="navbar-actions desktop-nav">
          {isAuthenticated ? (
            <div className="user-dropdown">
              <Link to="/profile" className="user-profile-btn">
                <div className="avatar-circle">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <span className="user-display-name">{user?.name || 'Chef'}</span>
              </Link>
              <button onClick={logout} className="btn-logout" title="Sign out">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-btn-group">
              <Link to="/login" className="btn btn-sm btn-secondary">
                Log In
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Join Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input mobile-search-input"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
          </form>

          <nav className="mobile-nav-links">
            <NavLink to="/" end onClick={closeMenu} className="mobile-nav-link">
              🏠 Home
            </NavLink>
            <NavLink to="/recipes" onClick={closeMenu} className="mobile-nav-link">
              📖 Browse Recipes
            </NavLink>
            <NavLink to="/submit" onClick={closeMenu} className="mobile-nav-link">
              ✍️ Submit Recipe
            </NavLink>
            <NavLink to="/profile" onClick={closeMenu} className="mobile-nav-link">
              👤 User Profile
            </NavLink>
          </nav>

          <div className="mobile-auth-section">
            {isAuthenticated ? (
              <div className="mobile-user-box">
                <p className="mobile-user-greeting">Signed in as <strong>{user?.name}</strong></p>
                <button onClick={() => { logout(); closeMenu(); }} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" onClick={closeMenu} className="btn btn-secondary" style={{ width: '100%' }}>
                  Log In
                </Link>
                <Link to="/register" onClick={closeMenu} className="btn btn-primary" style={{ width: '100%' }}>
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
