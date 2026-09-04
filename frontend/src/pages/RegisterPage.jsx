import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '440px', margin: '0 auto' }}>
      <h1>Create Account</h1>
      <p style={{ marginBottom: '1.5rem' }}>Join the FlavorCraft culinary community today.</p>
      <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
        <p>Registration form active in Phase 5.</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
