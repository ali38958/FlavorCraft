import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page-shell" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ marginBottom: '1rem' }}>Welcome to FlavorCraft</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
          Discover and share extraordinary culinary creations. Frontend foundation is active and operational.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/recipes" className="btn btn-primary">
            Browse Recipes
          </Link>
          <Link to="/submit" className="btn btn-secondary">
            Submit a Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
