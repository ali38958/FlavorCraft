import React from 'react';

export default function Badge({ category, children, className = '' }) {
  const getCategoryClass = (cat) => {
    if (!cat) return 'badge-default';
    const normalized = cat.toLowerCase().replace(/\s+/g, '-');
    switch (normalized) {
      case 'breakfast':
        return 'badge-breakfast';
      case 'vegan':
        return 'badge-vegan';
      case 'desserts':
      case 'dessert':
        return 'badge-desserts';
      case 'quick-meals':
      case 'quick':
        return 'badge-quick-meals';
      case 'dinner':
      case 'lunch':
        return 'badge-dinner';
      default:
        return 'badge-default';
    }
  };

  const badgeClass = getCategoryClass(category);

  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {children || category}
    </span>
  );
}
