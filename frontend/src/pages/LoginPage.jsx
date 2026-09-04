import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const redirectPath = location.state?.from?.pathname || '/';

  const fillDemoChef = () => {
    setEmail('chef@test.com');
    setPassword('secret123');
    setErrors({});
    setServerError(null);
  };

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setServerError(null);
      await login(email.trim(), password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setServerError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container login-container">
        <div className="login-card">
          <div className="login-header">
            <span className="login-icon">👨‍🍳</span>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">
              Sign in to share new recipes, manage your creations, and connect with fellow chefs.
            </p>
          </div>

          {/* Quick Demo Credentials Helper */}
          <div className="demo-credentials-banner">
            <div className="demo-text">
              <span className="demo-badge">Quick Test</span>
              <p>Evaluate with pre-seeded chef credentials:</p>
            </div>
            <button
              type="button"
              onClick={fillDemoChef}
              className="btn btn-sm btn-accent"
            >
              Fill Demo Chef Credentials ⚡
            </button>
          </div>

          {serverError && (
            <div className="login-error-alert">
              ⚠️ {serverError}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="chef@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: null }));
                }}
                className={`input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="label-flex-row">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((p) => ({ ...p, password: null }));
                }}
                className={`input ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg login-submit-btn"
            >
              {loading ? 'Signing In...' : 'Sign In to FlavorCraft'}
            </button>
          </form>

          <div className="login-footer-link">
            <p>
              New to FlavorCraft?{' '}
              <Link to="/register" className="auth-switch-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
