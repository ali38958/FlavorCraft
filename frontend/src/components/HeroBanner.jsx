import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeroBanner.css';

export default function HeroBanner() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/recipes');
    }
  };

  return (
    <section className="hero-banner">
      <div className="hero-overlay"></div>
      <div className="container hero-content-container">
        <div className="hero-badge">
          <span className="hero-badge-sparkle">✦</span>
          <span>Curated Culinary Community</span>
        </div>

        <h1 className="hero-title">
          Discover, Cook & Share <br />
          <span className="hero-title-highlight">Extraordinary</span> Recipes
        </h1>

        <p className="hero-subtitle">
          Explore delicious chef-crafted dishes, clear step-by-step instructions, and authentic culinary ideas from passionate home cooks worldwide.
        </p>

        {/* Hero Search Bar (PDF Requirement 1.b) */}
        <form className="hero-search-form" onSubmit={handleSearchSubmit}>
          <div className="hero-search-input-wrap">
            <span className="hero-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search recipes by title or ingredients (e.g., avocado, garlic, salmon)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="hero-search-input"
            />
          </div>
          <button type="submit" className="btn btn-primary hero-search-btn">
            Search Recipes
          </button>
        </form>

        {/* Dual CTA Buttons (PDF Requirement 1.c) */}
        <div className="hero-cta-group">
          <Link to="/recipes" className="btn btn-primary btn-lg hero-cta-browse">
            Browse Recipes
            <span className="cta-arrow">→</span>
          </Link>
          <Link to="/submit" className="btn btn-outline-white btn-lg hero-cta-submit">
            <span>✍️</span> Submit a Recipe
          </Link>
        </div>

        {/* Popular Tags */}
        <div className="hero-quick-tags">
          <span className="quick-tags-label">Popular:</span>
          <Link to="/recipes?category=Breakfast" className="quick-tag">Breakfast</Link>
          <Link to="/recipes?category=Vegan" className="quick-tag">Vegan</Link>
          <Link to="/recipes?category=Desserts" className="quick-tag">Desserts</Link>
          <Link to="/recipes?category=Quick+Meals" className="quick-tag">Quick Meals</Link>
          <Link to="/recipes?category=Dinner" className="quick-tag">Dinner</Link>
        </div>
      </div>
    </section>
  );
}
