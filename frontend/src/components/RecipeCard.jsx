import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import './RecipeCard.css';

export default function RecipeCard({ recipe }) {
  if (!recipe) return null;

  const {
    id,
    title,
    description,
    image,
    category,
    difficulty = 'Medium',
    cookingTime,
    rating = 4.8,
    author
  } = recipe;

  const getDifficultyClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return 'diff-easy';
      case 'hard': return 'diff-hard';
      default: return 'diff-medium';
    }
  };

  return (
    <article className="recipe-card">
      <Link to={`/recipes/${id}`} className="recipe-card-media-wrap">
        <img
          src={image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="recipe-card-img"
          loading="lazy"
        />
        <div className="card-top-badges">
          <Badge category={category} />
          {cookingTime && (
            <span className="card-time-pill">
              ⏱️ {cookingTime} min
            </span>
          )}
        </div>
      </Link>

      <div className="recipe-card-content">
        <div className="recipe-card-meta">
          <span className={`recipe-difficulty ${getDifficultyClass(difficulty)}`}>
            ● {difficulty}
          </span>
          <div className="recipe-rating">
            <span className="star-icon">★</span>
            <span className="rating-score">{Number(rating).toFixed(1)}</span>
          </div>
        </div>

        <h3 className="recipe-card-title">
          <Link to={`/recipes/${id}`}>{title}</Link>
        </h3>

        <p className="recipe-card-desc">
          {description}
        </p>

        <div className="recipe-card-footer">
          {author && (
            <span className="recipe-author">By {author}</span>
          )}
          <Link to={`/recipes/${id}`} className="recipe-card-cta">
            View Recipe →
          </Link>
        </div>
      </div>
    </article>
  );
}
