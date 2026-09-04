import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
      <span style={{ fontSize: '4rem' }}>🍲</span>
      <h1 style={{ marginTop: '1rem' }}>404 — Recipe Not Found</h1>
      <p style={{ maxWidth: '480px', margin: '0.75rem auto 2rem' }}>
        The culinary path you're looking for seems to have vanished from our kitchen shelves.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}
