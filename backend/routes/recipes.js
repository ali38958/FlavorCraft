const express = require('express');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe
} = require('../data/recipes');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/recipes
 * Retrieve recipes with optional search, category, and maxTime query filtering
 */
router.get('/', (req, res) => {
  try {
    const { search, category, maxTime } = req.query;
    const recipes = getAllRecipes({ search, category, maxTime });
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
});

/**
 * GET /api/recipes/:id
 * Retrieve a single recipe by its unique ID
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const recipe = getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ error: `Recipe with ID ${id} not found` });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(`Error fetching recipe ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to retrieve recipe details' });
  }
});

/**
 * POST /api/recipes
 * Submit a new recipe (Protected: Requires JWT)
 */
router.post('/', authenticateToken, (req, res) => {
  try {
    const { title, description, image, category, difficulty, cookingTime, ingredients, instructions } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Recipe title is required' });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({ error: 'Recipe category is required' });
    }

    const parsedCookingTime = Number(cookingTime);
    if (isNaN(parsedCookingTime) || parsedCookingTime <= 0) {
      return res.status(400).json({ error: 'Valid positive cooking time in minutes is required' });
    }

    // Validate ingredients (array or non-empty string)
    const validIngredients = Array.isArray(ingredients)
      ? ingredients.filter(i => String(i).trim().length > 0)
      : (ingredients ? String(ingredients).split('\n').filter(i => i.trim().length > 0) : []);

    if (validIngredients.length === 0) {
      return res.status(400).json({ error: 'At least one ingredient is required' });
    }

    // Validate instructions (array or non-empty string)
    const validInstructions = Array.isArray(instructions)
      ? instructions.filter(i => String(i).trim().length > 0)
      : (instructions ? String(instructions).split('\n').filter(i => i.trim().length > 0) : []);

    if (validInstructions.length === 0) {
      return res.status(400).json({ error: 'At least one step-by-step instruction is required' });
    }

    const newRecipe = createRecipe(
      {
        title,
        description,
        image,
        category,
        difficulty: difficulty || 'Medium',
        cookingTime: parsedCookingTime,
        ingredients: validIngredients,
        instructions: validInstructions
      },
      req.user
    );

    res.status(201).json({
      message: 'Recipe created successfully',
      recipe: newRecipe
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

/**
 * DELETE /api/recipes/:id
 * Delete a recipe by ID (Protected: Requires JWT)
 */
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const existingRecipe = getRecipeById(id);

    if (!existingRecipe) {
      return res.status(404).json({ error: `Recipe with ID ${id} not found` });
    }

    const deleted = deleteRecipe(id);
    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete recipe' });
    }

    res.status(200).json({
      message: 'Recipe deleted successfully',
      id
    });
  } catch (error) {
    console.error(`Error deleting recipe ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
