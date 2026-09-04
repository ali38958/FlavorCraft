import React from 'react';
import './FilterBar.css';

const CATEGORIES = [
  'All',
  'Breakfast',
  'Vegan',
  'Desserts',
  'Quick Meals',
  'Dinner'
];

const TIME_OPTIONS = [
  { label: 'Any Duration', value: '' },
  { label: '≤ 15 minutes', value: '15' },
  { label: '≤ 30 minutes', value: '30' },
  { label: '≤ 45 minutes', value: '45' },
  { label: '≤ 60 minutes', value: '60' }
];

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  maxTime,
  onMaxTimeChange,
  onReset,
  totalCount
}) {
  const isFiltered = !!search || (category && category !== 'All') || !!maxTime;

  return (
    <div className="filter-bar-wrapper">
      {/* Top Search & Dropdown Controls */}
      <div className="filter-controls-row">
        {/* Search by title or ingredient (PDF requirement 1.b) */}
        <div className="filter-search-wrap">
          <span className="filter-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Filter by recipe title or ingredient..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input filter-search-input"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="filter-search-clear"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Time Filter Dropdown (PDF requirement 2.b) */}
        <div className="filter-time-wrap">
          <label htmlFor="time-select" className="filter-select-label">
            ⏱️ Max Time:
          </label>
          <select
            id="time-select"
            value={maxTime}
            onChange={(e) => onMaxTimeChange(e.target.value)}
            className="select filter-time-select"
          >
            {TIME_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tabs (PDF requirement 2.b) */}
      <div className="filter-categories-row">
        <span className="category-tabs-label">Category:</span>
        <div className="category-pills">
          {CATEGORIES.map((cat) => {
            const isActive = (!category && cat === 'All') || category?.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat === 'All' ? '' : cat)}
                className={`category-pill-btn ${isActive ? 'active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Bar & Counter */}
      <div className="filter-status-row">
        <span className="results-counter">
          Showing <strong>{totalCount}</strong> {totalCount === 1 ? 'recipe' : 'recipes'}
        </span>

        {isFiltered && (
          <div className="active-filters-chips">
            {search && (
              <span className="filter-chip">
                Search: "{search}"
                <button onClick={() => onSearchChange('')} className="chip-remove">×</button>
              </span>
            )}
            {category && category !== 'All' && (
              <span className="filter-chip">
                Category: {category}
                <button onClick={() => onCategoryChange('')} className="chip-remove">×</button>
              </span>
            )}
            {maxTime && (
              <span className="filter-chip">
                Time: ≤ {maxTime} min
                <button onClick={() => onMaxTimeChange('')} className="chip-remove">×</button>
              </span>
            )}
            <button onClick={onReset} className="btn-clear-all">
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
