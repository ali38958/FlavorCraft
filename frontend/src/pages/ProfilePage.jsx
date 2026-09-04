import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import SkeletonCard from '../components/SkeletonCard';
import api from '../services/api';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUserRecipes() {
      if (!user) return;
      try {
        setLoading(true);
        const allRecipes = await api.getRecipes();
        // Filter recipes submitted by current user
        const userCreated = allRecipes.filter(
          (r) =>
            (r.authorId && String(r.authorId) === String(user.id)) ||
            (r.author && r.author.toLowerCase() === user.name?.toLowerCase())
        );
        setUserRecipes(userCreated);
      } catch (err) {
        console.error('Failed to load user recipes:', err);
        setError('Could not load your recipes at this time.');
      } finally {
        setLoading(false);
      }
    }
    loadUserRecipes();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="container profile-page-guest">
        <div className="guest-card">
          <span className="guest-icon">👤</span>
          <h1>User Profile</h1>
          <p>Please log in or create an account to view your chef profile and manage recipes.</p>
          <div className="guest-actions">
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'C';

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header Card */}
        <section className="profile-header-card">
          <div className="profile-avatar-large">
            {userInitial}
          </div>

          <div className="profile-details">
            <div className="profile-badges-row">
              <span className="badge badge-default">Community Chef</span>
              <span className="badge badge-vegan">Verified Contributor</span>
            </div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">✉️ {user.email}</p>
          </div>

          <div className="profile-header-actions">
            <Link to="/submit" className="btn btn-primary">
              ✍️ Submit a Recipe
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary">
              Sign Out
            </button>
          </div>
        </section>

        {/* User Stats Strip */}
        <section className="profile-stats-strip">
          <div className="stat-card">
            <span className="stat-value">{userRecipes.length}</span>
            <span className="stat-label">Published Recipes</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">5.0 ★</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">Active</span>
            <span className="stat-label">Kitchen Status</span>
          </div>
        </section>

        {/* User's Created Recipes Gallery */}
        <section className="profile-recipes-section">
          <div className="profile-section-header">
            <div>
              <h2 className="section-title">My Published Recipes</h2>
              <p className="section-subtitle">Manage, view, and share the culinary recipes you've created.</p>
            </div>
            {userRecipes.length > 0 && (
              <Link to="/submit" className="btn btn-secondary btn-sm">
                + Add Another Recipe
              </Link>
            )}
          </div>

          {error && <div className="profile-error-alert">⚠️ {error}</div>}

          <div className="profile-recipes-grid">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : userRecipes.length > 0 ? (
              userRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              /* Empty State */
              <div className="profile-empty-state">
                <span className="empty-chef-hat">👨‍🍳</span>
                <h3>No Recipes Published Yet</h3>
                <p>
                  You haven't added any culinary recipes to the community library yet. Share your secret family recipe or your favorite quick dinner!
                </p>
                <Link to="/submit" className="btn btn-primary btn-lg">
                  Submit Your First Recipe 🚀
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
