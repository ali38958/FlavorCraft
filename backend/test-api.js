/**
 * Comprehensive API Integration Test Suite for Recipe Sharing Backend
 * Tests all authentication, recipe CRUD, and filtering routes.
 */

process.env.NODE_ENV = 'test';
process.env.PORT = '5055'; // Use isolated test port
process.env.JWT_SECRET = 'test_secret_key_12345';

const http = require('http');
const app = require('./server');

let server;
const BASE_URL = 'http://localhost:5055';
let passedCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (!condition) {
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    passedCount++;
    console.log(`  ✅ PASS: ${message}`);
  }
}

async function runTests() {
  console.log('\n=============================================');
  console.log('🧪 Starting Recipe Sharing Backend API Tests');
  console.log('=============================================\n');

  await new Promise((resolve) => {
    server = app.listen(5055, resolve);
  });

  try {
    // 1. Health Check
    console.log('--- 1. Health Check ---');
    const healthRes = await fetch(`${BASE_URL}/health`);
    assert(healthRes.status === 200, 'GET /health returns HTTP 200');
    const healthData = await healthRes.json();
    assert(healthData.status === 'ok', 'GET /health status is "ok"');

    // 2. Authentication: Register
    console.log('\n--- 2. User Registration ---');
    const testEmail = `chef_${Date.now()}@culinary.test`;
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Master Chef Test',
        email: testEmail,
        password: 'securePassword123'
      })
    });
    assert(regRes.status === 201, 'POST /api/auth/register returns HTTP 201 Created');
    const regData = await regRes.json();
    assert(!!regData.token, 'Register returns JWT token');
    assert(regData.user.email === testEmail, 'Register returns correct user email');
    const authToken = regData.token;

    // 3. Authentication: Register Duplicate Email
    console.log('\n--- 3. Duplicate Email Rejection ---');
    const dupRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate',
        email: testEmail,
        password: 'password123'
      })
    });
    assert(dupRes.status === 400, 'Duplicate registration returns HTTP 400 Bad Request');

    // 4. Authentication: Login
    console.log('\n--- 4. User Login ---');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'securePassword123'
      })
    });
    assert(loginRes.status === 200, 'POST /api/auth/login returns HTTP 200 OK');
    const loginData = await loginRes.json();
    assert(!!loginData.token, 'Login returns valid token');

    // 5. Authentication: Profile
    console.log('\n--- 5. Protected Profile Route ---');
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    assert(meRes.status === 200, 'GET /api/auth/me returns HTTP 200');
    const meData = await meRes.json();
    assert(meData.name === 'Master Chef Test', 'GET /api/auth/me returns correct name');

    // 6. Recipes: Get All
    console.log('\n--- 6. List All Recipes ---');
    const allRecipesRes = await fetch(`${BASE_URL}/api/recipes`);
    assert(allRecipesRes.status === 200, 'GET /api/recipes returns HTTP 200');
    const allRecipes = await allRecipesRes.json();
    assert(Array.isArray(allRecipes) && allRecipes.length >= 8, `GET /api/recipes returns array with at least 8 recipes (found ${allRecipes.length})`);

    // 7. Recipes: Filter by Category
    console.log('\n--- 7. Filter by Category ---');
    const breakfastRes = await fetch(`${BASE_URL}/api/recipes?category=Breakfast`);
    assert(breakfastRes.status === 200, 'GET /api/recipes?category=Breakfast returns HTTP 200');
    const breakfastList = await breakfastRes.json();
    assert(breakfastList.length > 0, 'Found Breakfast recipes');
    assert(breakfastList.every(r => r.category.toLowerCase() === 'breakfast'), 'All returned recipes belong to Breakfast category');

    // 8. Recipes: Filter by Search (Title or Ingredients)
    console.log('\n--- 8. Filter by Search (Title & Ingredients) ---');
    const searchRes = await fetch(`${BASE_URL}/api/recipes?search=avocado`);
    assert(searchRes.status === 200, 'GET /api/recipes?search=avocado returns HTTP 200');
    const searchList = await searchRes.json();
    assert(searchList.length > 0, 'Found recipes matching "avocado"');

    // 9. Recipes: Get by ID
    console.log('\n--- 9. Get Single Recipe Details ---');
    const recipeId = allRecipes[0].id;
    const singleRes = await fetch(`${BASE_URL}/api/recipes/${recipeId}`);
    assert(singleRes.status === 200, `GET /api/recipes/${recipeId} returns HTTP 200`);
    const singleRecipe = await singleRes.json();
    assert(singleRecipe.id === recipeId, 'Returned recipe has matching ID');
    assert(Array.isArray(singleRecipe.ingredients) && singleRecipe.ingredients.length > 0, 'Recipe has ingredients array');
    assert(Array.isArray(singleRecipe.instructions) && singleRecipe.instructions.length > 0, 'Recipe has step instructions');

    // 10. Recipes: POST without Auth (Must Fail with 401)
    console.log('\n--- 10. Recipe Submission Security Guard ---');
    const unauthPostRes = await fetch(`${BASE_URL}/api/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Unauthenticated Soup',
        category: 'Dinner',
        cookingTime: 20,
        ingredients: ['water', 'salt'],
        instructions: ['Boil']
      })
    });
    assert(unauthPostRes.status === 401, 'POST /api/recipes without auth returns HTTP 401 Unauthorized');

    // 11. Recipes: POST with Auth (Create Recipe)
    console.log('\n--- 11. Authenticated Recipe Submission ---');
    const createRes = await fetch(`${BASE_URL}/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({
        title: 'Artisan Garlic Truffle Risotto',
        description: 'Creamy carnaroli rice slow-cooked with aromatic white truffle oil and wild mushrooms.',
        category: 'Dinner',
        difficulty: 'Medium',
        cookingTime: 35,
        ingredients: [
          '1 1/2 cups Carnaroli rice',
          '4 cups warm vegetable stock',
          '2 tbsp white truffle oil',
          '1 cup sautéed wild chanterelles'
        ],
        instructions: [
          'Toast rice with olive oil until translucent.',
          'Gradually ladle warm stock, stirring continuously.',
          'Fold in wild chanterelles and finish with truffle oil.'
        ]
      })
    });
    assert(createRes.status === 201, 'POST /api/recipes with token returns HTTP 201 Created');
    const createdData = await createRes.json();
    assert(!!createdData.recipe && !!createdData.recipe.id, 'Created recipe returned with generated ID');
    const newRecipeId = createdData.recipe.id;

    // 12. Recipes: DELETE without Auth (Must Fail with 401)
    console.log('\n--- 12. Recipe Deletion Security Guard ---');
    const unauthDelRes = await fetch(`${BASE_URL}/api/recipes/${newRecipeId}`, {
      method: 'DELETE'
    });
    assert(unauthDelRes.status === 401, 'DELETE /api/recipes/:id without auth returns HTTP 401 Unauthorized');

    // 13. Recipes: DELETE with Auth (Successful Deletion)
    console.log('\n--- 13. Authenticated Recipe Deletion ---');
    const authDelRes = await fetch(`${BASE_URL}/api/recipes/${newRecipeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` }
    });
    assert(authDelRes.status === 200, 'DELETE /api/recipes/:id with token returns HTTP 200 OK');

    // Verify it is actually deleted
    const verifyDelRes = await fetch(`${BASE_URL}/api/recipes/${newRecipeId}`);
    assert(verifyDelRes.status === 404, 'GET deleted recipe returns HTTP 404 Not Found');

    console.log('\n=============================================');
    console.log(`🎉 ALL TESTS PASSED! (${passedCount}/${totalCount})`);
    console.log('=============================================\n');
  } catch (err) {
    console.error('\n❌ Test suite failed with error:', err);
    process.exitCode = 1;
  } finally {
    if (server) {
      server.close();
    }
  }
}

runTests();
