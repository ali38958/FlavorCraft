/**
 * Centralized API client for interacting with the Express backend
 */

const BASE_URL = '/api';

/**
 * Generic request helper with automatic JWT injection
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const token = localStorage.getItem('recipe_auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data.error || data.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Recipe Endpoints
  getRecipes: async ({ search = '', category = '', maxTime = '' } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category.toLowerCase() !== 'all') params.append('category', category);
    if (maxTime) params.append('maxTime', maxTime);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return request(`/recipes${queryString}`);
  },

  getRecipeById: async (id) => {
    return request(`/recipes/${id}`);
  },

  createRecipe: async (recipeData) => {
    return request('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData)
    });
  },

  deleteRecipe: async (id) => {
    return request(`/recipes/${id}`, {
      method: 'DELETE'
    });
  },

  // Auth Endpoints
  register: async ({ name, email, password }) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  login: async ({ email, password }) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  getMe: async () => {
    return request('/auth/me');
  }
};

export default api;
