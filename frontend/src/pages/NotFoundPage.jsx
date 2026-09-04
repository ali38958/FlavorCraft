import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const QUICK_CATEGORIES = [
  { name: 'Breakfast', icon: '🥞' },
  { name: 'Vegan', icon: '🥑' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Quick Meals', icon: '⏱️' },
  { name: 'Dinner', icon: '🍲' }
];

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-card">
          <div className="not-found-icon-wrap">
            <span className="not-found-emoji" role="img" aria-label="Simmering pot">🍲</span>
          </div>

          <span className="not-found-code">Error 404</span>
          <h1 className="not-found-title">Recipe Off The Menu!</h1>
          <p className="not-found-desc">
            The culinary creation or page you're searching for seems to have vanished from our kitchen shelves or was relocated.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              🍳 Back to Kitchen (Home)
            </Link>
            <Link to="/recipes" className="btn btn-secondary btn-lg">
              📖 Browse All Recipes
            </Link>
          </div>

          <div className="not-found-suggestion-box">
            <p className="suggestion-title">Or explore a culinary category:</p>
            <div className="suggestion-pills">
              {QUICK_CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/recipes?category=${encodeURIComponent(cat.name)}`}
                  className="suggestion-pill"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
