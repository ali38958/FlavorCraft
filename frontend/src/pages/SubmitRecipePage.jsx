import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './SubmitRecipePage.css';

const CATEGORIES = [
  'Breakfast',
  'Vegan',
  'Desserts',
  'Quick Meals',
  'Dinner'
];

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1000&q=80'
];

export default function SubmitRecipePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Form State (PDF Requirement 4.a: Title, Ingredients, Instructions, Category, Cooking Time)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Dinner',
    difficulty: 'Medium',
    cookingTime: '30',
    image: SAMPLE_IMAGES[0]
  });

  const [ingredients, setIngredients] = useState(['', '', '']);
  const [instructions, setInstructions] = useState(['', '', '']);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Ingredients Handlers
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
    if (errors.ingredients) {
      setErrors((prev) => ({ ...prev, ingredients: null }));
    }
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredientRow = (index) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Instructions Handlers
  const handleInstructionChange = (index, value) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
    if (errors.instructions) {
      setErrors((prev) => ({ ...prev, instructions: null }));
    }
  };

  const addInstructionRow = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstructionRow = (index) => {
    if (instructions.length <= 1) return;
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  // Validation
  const validateForm = () => {
    const errs = {};

    if (!formData.title.trim() || formData.title.trim().length < 3) {
      errs.title = 'Recipe title must be at least 3 characters.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 15) {
      errs.description = 'Please provide a short appetizing description (at least 15 characters).';
    }

    const timeNum = Number(formData.cookingTime);
    if (isNaN(timeNum) || timeNum <= 0) {
      errs.cookingTime = 'Please enter a valid positive cooking duration in minutes.';
    }

    const validIngs = ingredients.map((i) => i.trim()).filter(Boolean);
    if (validIngs.length < 2) {
      errs.ingredients = 'Please provide at least 2 ingredients.';
    }

    const validInsts = instructions.map((i) => i.trim()).filter(Boolean);
    if (validInsts.length < 2) {
      errs.instructions = 'Please provide at least 2 step-by-step instructions.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isAuthenticated) {
      setServerError('Please log in or create an account to submit your recipe.');
      return;
    }

    try {
      setSubmitting(true);
      setServerError(null);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
        cookingTime: Number(formData.cookingTime),
        image: formData.image.trim(),
        ingredients: ingredients.map((i) => i.trim()).filter(Boolean),
        instructions: instructions.map((i) => i.trim()).filter(Boolean)
      };

      const result = await api.createRecipe(payload);

      if (result && result.recipe && result.recipe.id) {
        navigate(`/recipes/${result.recipe.id}`);
      } else {
        navigate('/recipes');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setServerError(err.message || 'Failed to submit recipe. Please check your connection.');
      setSubmitting(false);
    }
  };

  return (
    <div className="submit-recipe-page">
      <div className="container submit-container">
        {/* Page Header */}
        <header className="submit-header">
          <span className="section-eyebrow">Share Your Craft</span>
          <h1 className="submit-title">Submit a Recipe</h1>
          <p className="submit-subtitle">
            Contribute your culinary masterpiece to the FlavorCraft community. Fill out the details below to publish your recipe.
          </p>
        </header>

        {/* Auth Guard Banner if unauthenticated */}
        {!isAuthenticated && (
          <div className="submit-auth-prompt-card">
            <span className="auth-prompt-icon">🔒</span>
            <div className="auth-prompt-body">
              <h3>Authentication Required</h3>
              <p>You must be signed in to publish recipes. You can draft your recipe below now, then log in to save.</p>
              <div className="auth-prompt-actions">
                <Link to="/login" className="btn btn-primary btn-sm">
                  Sign In to Publish
                </Link>
                <Link to="/register" className="btn btn-secondary btn-sm">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        )}

        {serverError && (
          <div className="submit-error-banner">
            ⚠️ {serverError}
          </div>
        )}

        {/* Recipe Submission Form (PDF Requirement 4.a) */}
        <form className="submit-form" onSubmit={handleSubmit}>
          {/* Section 1: Basic Info */}
          <section className="form-card">
            <h2 className="form-card-title">1. General Recipe Overview</h2>

            {/* Title (PDF Requirement 4.a) */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Recipe Title <span className="required-star">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Creamy Garlic Butter Truffle Gnocchi"
                value={formData.title}
                onChange={handleInputChange}
                className={`input ${errors.title ? 'input-error' : ''}`}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            {/* Short Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Short Description <span className="required-star">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Describe the flavors, texture, and aroma that make this dish special..."
                value={formData.description}
                onChange={handleInputChange}
                className={`textarea ${errors.description ? 'input-error' : ''}`}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            {/* Category & Time & Difficulty Row (PDF Requirement 4.a: Category & Cooking Time) */}
            <div className="form-row three-cols">
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category <span className="required-star">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cookingTime" className="form-label">
                  Cooking Time (minutes) <span className="required-star">*</span>
                </label>
                <input
                  id="cookingTime"
                  name="cookingTime"
                  type="number"
                  min="1"
                  max="480"
                  placeholder="30"
                  value={formData.cookingTime}
                  onChange={handleInputChange}
                  className={`input ${errors.cookingTime ? 'input-error' : ''}`}
                />
                {errors.cookingTime && <span className="error-text">{errors.cookingTime}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="difficulty" className="form-label">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="select"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Image URL & Sample Picker */}
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Recipe Image URL
              </label>
              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={handleInputChange}
                className="input"
              />
              <div className="sample-images-row">
                <span className="sample-label">Or choose a quick culinary photo:</span>
                <div className="sample-thumbnails">
                  {SAMPLE_IMAGES.map((imgUrl, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setFormData((p) => ({ ...p, image: imgUrl }))}
                      className={`sample-thumb-btn ${formData.image === imgUrl ? 'selected' : ''}`}
                    >
                      <img src={imgUrl} alt={`Sample ${i + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Ingredients (PDF Requirement 4.a) */}
          <section className="form-card">
            <div className="card-header-flex">
              <div>
                <h2 className="form-card-title">2. Ingredients List</h2>
                <p className="card-subtitle">List each ingredient with quantity and measurement units.</p>
              </div>
              <button
                type="button"
                onClick={addIngredientRow}
                className="btn btn-secondary btn-sm"
              >
                + Add Ingredient
              </button>
            </div>

            {errors.ingredients && <div className="error-text mb-2">{errors.ingredients}</div>}

            <div className="dynamic-rows-list">
              {ingredients.map((item, index) => (
                <div key={index} className="dynamic-row">
                  <span className="row-index-bullet">{index + 1}.</span>
                  <input
                    type="text"
                    placeholder={`e.g., ${index === 0 ? '2 tbsp extra virgin olive oil' : index === 1 ? '3 cloves garlic, minced' : '1 tsp kosher salt'}`}
                    value={item}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="input dynamic-row-input"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientRow(index)}
                      className="btn-remove-row"
                      title="Remove row"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Step-by-Step Instructions (PDF Requirement 4.a) */}
          <section className="form-card">
            <div className="card-header-flex">
              <div>
                <h2 className="form-card-title">3. Step-by-Step Instructions</h2>
                <p className="card-subtitle">Provide sequential steps for the cook to follow effortlessly.</p>
              </div>
              <button
                type="button"
                onClick={addInstructionRow}
                className="btn btn-secondary btn-sm"
              >
                + Add Step
              </button>
            </div>

            {errors.instructions && <div className="error-text mb-2">{errors.instructions}</div>}

            <div className="dynamic-rows-list">
              {instructions.map((step, index) => (
                <div key={index} className="dynamic-row instruction-row">
                  <span className="step-badge">Step {index + 1}</span>
                  <textarea
                    rows="2"
                    placeholder={`Describe step ${index + 1}...`}
                    value={step}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    className="textarea dynamic-row-input"
                  />
                  {instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstructionRow(index)}
                      className="btn-remove-row"
                      title="Remove step"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Submit Action Card */}
          <div className="form-actions-card">
            <div className="actions-note">
              <p>Ready to publish? Your recipe will be immediately discoverable by our community.</p>
            </div>
            <div className="actions-buttons">
              <button
                type="button"
                onClick={() => navigate('/recipes')}
                className="btn btn-secondary btn-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
              >
                {submitting ? 'Publishing Recipe...' : 'Publish Recipe 🚀'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
