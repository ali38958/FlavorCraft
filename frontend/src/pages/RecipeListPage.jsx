import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import FilterBar from '../components/FilterBar';
import SkeletonCard from '../components/SkeletonCard';
import useDebounce from '../hooks/useDebounce';
import api from '../services/api';
import './RecipeListPage.css';

export default function RecipeListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read URL query parameters
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentMaxTime = searchParams.get('maxTime') || '';

  // Update query params helper
  const updateFilterParam = useCallback((key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  // Sync state during render when URL query param changes externally
  const [prevSearch, setPrevSearch] = useState(currentSearch);
  const [searchInput, setSearchInput] = useState(currentSearch);
  if (currentSearch !== prevSearch) {
    setPrevSearch(currentSearch);
    setSearchInput(currentSearch);
  }

  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync debounced search to URL query param
  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      updateFilterParam('search', debouncedSearch);
    }
  }, [debouncedSearch, currentSearch, updateFilterParam]);

  const handleResetFilters = () => {
    setSearchInput('');
    setPrevSearch('');
    setSearchParams({}, { replace: true });
  };

  useEffect(() => {
    let isCancelled = false;

    async function fetchRecipes() {
      try {
        setLoading(true);
        setError(null);

        const data = await api.getRecipes({
          search: currentSearch,
          category: currentCategory,
          maxTime: currentMaxTime
        });

        if (!isCancelled) {
          setRecipes(data);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error fetching recipes list:', err);
          setError('Failed to fetch recipes from the server. Please check your connection.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchRecipes();

    return () => {
      isCancelled = true;
    };
  }, [currentSearch, currentCategory, currentMaxTime]);

  return (
    <div className="recipe-list-page">
      <div className="container">
        {/* Page Header */}
        <header className="recipe-list-header">
          <span className="section-eyebrow">Culinary Archive</span>
          <h1 className="recipe-list-title">Browse Recipes</h1>
          <p className="recipe-list-subtitle">
            Filter through our chef-tested recipes by category, ingredients, cooking duration, or difficulty.
          </p>
        </header>

        {/* Filter Bar (PDF Requirement 2.b & 1.b) */}
        <FilterBar
          search={searchInput}
          onSearchChange={setSearchInput}
          category={currentCategory}
          onCategoryChange={(cat) => updateFilterParam('category', cat)}
          maxTime={currentMaxTime}
          onMaxTimeChange={(time) => updateFilterParam('maxTime', time)}
          onReset={handleResetFilters}
          totalCount={recipes.length}
        />

        {/* Error Alert */}
        {error && (
          <div className="recipes-error-box">
            <p>⚠️ {error}</p>
            <button
              onClick={() => updateFilterParam('retry', Date.now().toString())}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '0.75rem' }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Recipe Grid (PDF Requirement 2.a) */}
        <div className="recipes-grid-layout">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            /* Empty State */
            <div className="recipes-empty-state">
              <span className="empty-icon">🥗</span>
              <h3>No Recipes Found</h3>
              <p>
                We couldn't find any recipes matching your current filters.
                Try adjusting your search terms or relaxing the filters.
              </p>
              <div className="empty-actions">
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
                <Link to="/submit" className="btn btn-secondary">
                  Submit a New Recipe
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
