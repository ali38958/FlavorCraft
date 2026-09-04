import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1>User Profile</h1>
      {isAuthenticated ? (
        <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', maxWidth: '500px', marginTop: '1.5rem' }}>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <button onClick={logout} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
            Sign Out
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          <p>You are not currently logged in.</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-primary btn-sm">Log In</Link>
            <Link to="/register" className="btn btn-secondary btn-sm">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
}
