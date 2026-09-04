import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import RecipeCard from '../components/RecipeCard';
import SkeletonCard from '../components/SkeletonCard';
import api from '../services/api';
import './HomePage.css';

export default function HomePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const allRecipes = await api.getRecipes();
        // Pick the top 4 rated recipes
        const sorted = [...allRecipes].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setFeaturedRecipes(sorted.slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured recipes:', err);
        setError('Could not load featured recipes at this moment.');
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* 1. Full-Width Hero Banner (PDF Requirement 1.b & 1.c) */}
      <HeroBanner />

      {/* 2. Featured Categories Section (PDF Requirement 1.d) */}
      <CategoryGrid />

      {/* 3. Featured Recipes Section */}
      <section className="featured-recipes-section">
        <div className="container">
          <div className="featured-header">
            <div>
              <span className="section-eyebrow">Chef's Selection</span>
              <h2 className="section-title">Highest-Rated Recipes</h2>
              <p className="section-subtitle">
                The most celebrated dishes loved, tested, and rated by our culinary community.
              </p>
            </div>
            <Link to="/recipes" className="btn btn-secondary featured-view-all-btn">
              Browse All Recipes →
            </Link>
          </div>

          {error && (
            <div className="featured-error-msg">
              <p>{error}</p>
            </div>
          )}

          <div className="featured-recipe-grid">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : featuredRecipes.length > 0 ? (
              featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <p className="no-recipes-text">No recipes available right now.</p>
            )}
          </div>

          <div className="featured-mobile-cta">
            <Link to="/recipes" className="btn btn-primary" style={{ width: '100%' }}>
              Browse All Recipes →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Culinary Feature Highlights */}
      <section className="features-highlight-strip">
        <div className="container">
          <div className="features-highlight-grid">
            <div className="highlight-item">
              <span className="highlight-icon">🥘</span>
              <h3 className="highlight-title">Tested & Verified</h3>
              <p className="highlight-desc">Every recipe features precise measurements and step-by-step guidance for foolproof results.</p>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">⏱️</span>
              <h3 className="highlight-title">Quick & Flexible</h3>
              <p className="highlight-desc">Filter effortlessly by cooking time, dietary style, or ingredients already in your pantry.</p>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">👩‍🍳</span>
              <h3 className="highlight-title">Passionate Chefs</h3>
              <p className="highlight-desc">Contribute your family heirloom recipes and exchange culinary notes with home gourmets worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Invitation Banner */}
      <section className="community-cta-section">
        <div className="container">
          <div className="community-cta-box">
            <div className="community-cta-content">
              <span className="community-cta-badge">Share Your Passion</span>
              <h2 className="community-cta-title">Have a Signature Dish to Share?</h2>
              <p className="community-cta-desc">
                Join our kitchen community. Submit your original recipes, receive helpful reviews, and inspire food enthusiasts around the globe.
              </p>
              <div className="community-cta-actions">
                <Link to="/submit" className="btn btn-primary btn-lg">
                  Submit Your Recipe Now
                </Link>
                <Link to="/recipes" className="btn btn-secondary btn-lg">
                  Explore Recipe Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
