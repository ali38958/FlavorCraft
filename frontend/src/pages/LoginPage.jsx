import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '440px', margin: '0 auto' }}>
      <h1>Sign In</h1>
      <p style={{ marginBottom: '1.5rem' }}>Welcome back! Sign in to share and manage your culinary creations.</p>
      <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
        <p>Login form active in Phase 5.</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Join free</Link>
        </p>
      </div>
    </div>
  );
}
