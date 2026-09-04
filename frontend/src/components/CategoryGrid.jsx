import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const CATEGORIES = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: '🥞',
    tagline: 'Morning toasts, scrambles & bowls',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    color: 'var(--cat-breakfast)'
  },
  {
    id: 'vegan',
    name: 'Vegan',
    icon: '🥑',
    tagline: 'Fresh, vibrant plant-based dishes',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    color: 'var(--cat-vegan)'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    tagline: 'Decadent cakes, tarts & chocolates',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    color: 'var(--cat-desserts)'
  },
  {
    id: 'quick-meals',
    name: 'Quick Meals',
    icon: '⚡',
    tagline: 'Delicious meals in 20 mins or less',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    color: 'var(--cat-quick)'
  },
  {
    id: 'dinner',
    name: 'Dinner',
    icon: '🍷',
    tagline: 'Hearty pastas, roasts & curries',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    color: 'var(--cat-dinner)'
  }
];

export default function CategoryGrid() {
  return (
    <section className="category-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Explore Cuisines</span>
          <h2 className="section-title">Featured Recipe Categories</h2>
          <p className="section-subtitle">
            Find the perfect dish for any time of day, culinary mood, or dietary preference.
          </p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/recipes?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
            >
              <div className="category-media">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-img"
                  loading="lazy"
                />
                <div className="category-gradient-overlay"></div>
              </div>

              <div className="category-info">
                <span className="category-icon-pill">{cat.icon}</span>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc">{cat.tagline}</p>
                <span className="category-explore-cta">
                  Explore {cat.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
