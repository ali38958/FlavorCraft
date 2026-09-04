import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RecipeDetailPage() {
  const { id } = useParams();
  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <Link to="/recipes" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
        ← Back to Recipes
      </Link>
      <h1 style={{ marginTop: '1rem' }}>Recipe #{id}</h1>
      <p>Detailed ingredients checklist, step instructions, and user ratings.</p>
    </div>
  );
}
