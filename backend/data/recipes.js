/**
 * In-Memory Recipe Store seeded with 8+ culinary recipes.
 * Supports filtering by search (title or ingredients), category, and cooking time.
 */

let recipes = [
  {
    id: "1",
    title: "Classic Avocado & Poached Egg Sourdough",
    description: "Crispy artisan sourdough toast topped with smashed avocado, chili flakes, microgreens, and perfectly runny poached eggs.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80",
    category: "Breakfast",
    difficulty: "Easy",
    cookingTime: 15,
    rating: 4.8,
    ingredients: [
      "2 slices artisan sourdough bread",
      "1 ripe Hass avocado",
      "2 large organic eggs",
      "1 tbsp white vinegar (for poaching)",
      "1/2 lemon, juiced",
      "Pinch of red pepper flakes",
      "Sea salt and freshly cracked black pepper",
      "1 tbsp extra virgin olive oil",
      "Handful of fresh microgreens"
    ],
    instructions: [
      "Bring a medium pot of water to a gentle simmer. Add the white vinegar.",
      "Toast sourdough slices until golden brown and firm.",
      "Cut avocado in half, scoop flesh into a bowl, mash with lemon juice, salt, and pepper.",
      "Crack each egg into a small ramekin. Create a gentle whirlpool in simmering water and slide egg in. Poach for 3-4 minutes.",
      "Spread smashed avocado generously over toast slices.",
      "Top each slice with a drained poached egg, drizzle olive oil, and garnish with red chili flakes and microgreens."
    ],
    author: "Chef Antoine",
    createdAt: "2026-08-15T08:30:00.000Z"
  },
  {
    id: "2",
    title: "Crispy Tofu & Green Goddess Buddha Bowl",
    description: "Nourishing plant-based bowl loaded with sesame-crusted tofu, quinoa, edamame, shredded cabbage, and creamy herb dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80",
    category: "Vegan",
    difficulty: "Medium",
    cookingTime: 30,
    rating: 4.9,
    ingredients: [
      "200g extra-firm tofu, pressed and cubed",
      "1 cup cooked rainbow quinoa",
      "1/2 cup shelled edamame",
      "1/2 cup purple cabbage, thinly sliced",
      "1 Persian cucumber, sliced",
      "1 tbsp cornstarch",
      "1 tbsp sesame oil",
      "1/4 cup tahini",
      "1/4 cup fresh cilantro and parsley",
      "1 garlic clove",
      "2 tbsp lime juice"
    ],
    instructions: [
      "Toss tofu cubes with cornstarch, salt, and sesame oil until evenly coated.",
      "Pan-fry tofu in a skillet over medium-high heat until golden and crispy on all sides (8-10 mins).",
      "Blend tahini, fresh herbs, garlic, lime juice, salt, and 3 tbsp ice water to create green goddess dressing.",
      "Assemble bowl with a quinoa base, arranging crispy tofu, edamame, sliced cucumber, and purple cabbage.",
      "Drizzle generously with dressing and sprinkle toasted sesame seeds."
    ],
    author: "Elena Rostova",
    createdAt: "2026-08-18T12:00:00.000Z"
  },
  {
    id: "3",
    title: "Warm Molten Dark Chocolate Lava Cakes",
    description: "Decadent individual chocolate cakes with molten, flowing ganache centers, dusted with cocoa and served warm.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80",
    category: "Desserts",
    difficulty: "Medium",
    cookingTime: 25,
    rating: 5.0,
    ingredients: [
      "120g 70% dark chocolate, chopped",
      "100g unsalted butter",
      "2 large eggs + 2 egg yolks",
      "1/3 cup granulated sugar",
      "2 tbsp all-purpose flour",
      "1 tsp vanilla extract",
      "Pinch of espresso powder",
      "Powdered sugar for dusting",
      "Fresh raspberries for serving"
    ],
    instructions: [
      "Preheat oven to 215°C (425°F). Butter and dust 4 ramekins with cocoa powder.",
      "Melt dark chocolate and butter together in a heatproof bowl set over simmering water; let cool slightly.",
      "In a separate bowl, whisk eggs, egg yolks, sugar, and vanilla until pale and thick.",
      "Fold melted chocolate mixture into beaten eggs, then gently fold in flour and espresso powder.",
      "Divide batter among prepared ramekins. Bake for 12-13 minutes until edges are firm but centers are soft.",
      "Run a knife around edges, invert onto plates, dust with powdered sugar, and garnish with raspberries."
    ],
    author: "Pastry Chef Pierre",
    createdAt: "2026-08-20T19:45:00.000Z"
  },
  {
    id: "4",
    title: "15-Minute Garlic Butter Shrimp Scampi",
    description: "Plump succulent shrimp seared in garlic butter, white grape juice reduction, red pepper flakes, and fresh Italian parsley.",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=80",
    category: "Quick Meals",
    difficulty: "Easy",
    cookingTime: 15,
    rating: 4.7,
    ingredients: [
      "400g raw jumbo shrimp, peeled and deveined",
      "4 cloves garlic, finely minced",
      "3 tbsp unsalted butter",
      "2 tbsp olive oil",
      "1/4 cup vegetable broth or non-alcoholic white wine",
      "Juice of 1 lemon",
      "1/4 tsp crushed red pepper flakes",
      "1/4 cup fresh flat-leaf parsley, chopped",
      "Crusty baguette or cooked angel hair pasta"
    ],
    instructions: [
      "Pat shrimp thoroughly dry with paper towels; season with salt and black pepper.",
      "Heat olive oil and 1 tbsp butter in a large skillet over medium-high heat.",
      "Add shrimp in a single layer and sear for 1.5 minutes per side until pink and opaque. Transfer to plate.",
      "Reduce heat to medium; add minced garlic and chili flakes, sautéing for 45 seconds until fragrant.",
      "Pour in broth and lemon juice, simmering for 2 minutes to reduce slightly.",
      "Stir in remaining butter until velvety, return shrimp to skillet, toss with chopped parsley, and serve immediately."
    ],
    author: "Marcus Vance",
    createdAt: "2026-08-22T18:15:00.000Z"
  },
  {
    id: "5",
    title: "Herb-Crusted Rosemary Lamb Chops with Roasted Carrots",
    description: "Tender lamb rib chops seared to medium-rare perfection with garlic rosemary glaze and honey-roasted heirloom carrots.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    category: "Dinner",
    difficulty: "Hard",
    cookingTime: 45,
    rating: 4.9,
    ingredients: [
      "8 frenched lamb rib chops",
      "3 tbsp fresh rosemary, finely chopped",
      "4 cloves garlic, crushed",
      "3 tbsp olive oil",
      "2 tbsp Dijon mustard",
      "500g heirloom baby carrots, trimmed",
      "2 tbsp clover honey",
      "Coarse sea salt and freshly ground pepper"
    ],
    instructions: [
      "Preheat oven to 200°C (400°F). Toss carrots with olive oil, honey, salt, and pepper; roast for 25 minutes.",
      "Mix rosemary, minced garlic, mustard, olive oil, salt, and pepper to create marinade. Coat lamb chops and rest 15 mins.",
      "Heat a heavy cast-iron skillet over high heat until smoking hot.",
      "Sear lamb chops for 3 minutes per side until beautifully caramelized.",
      "Transfer skillet to oven for 4-5 minutes until internal temp reaches 54°C (130°F) for medium-rare.",
      "Rest meat for 5 minutes before plating alongside honey roasted carrots."
    ],
    author: "Chef Antoine",
    createdAt: "2026-08-25T20:00:00.000Z"
  },
  {
    id: "6",
    title: "Fluffy Buttermilk Ricotta Pancakes with Blueberry Compote",
    description: "Cloud-like golden pancakes folded with creamy ricotta and lemon zest, drizzled with warm homemade blueberry maple reduction.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1000&q=80",
    category: "Breakfast",
    difficulty: "Easy",
    cookingTime: 20,
    rating: 4.9,
    ingredients: [
      "1 1/2 cups unbleached all-purpose flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1/2 cup fresh ricotta cheese",
      "1 cup buttermilk",
      "2 large eggs, separated",
      "Zest of 1 Meyer lemon",
      "1 cup fresh blueberries",
      "1/3 cup pure maple syrup"
    ],
    instructions: [
      "In a small saucepan, simmer blueberries with maple syrup for 6-8 minutes until syrupy; keep warm.",
      "Whisk flour, sugar, baking powder, and salt in a large bowl.",
      "In another bowl, whisk egg yolks, ricotta, buttermilk, and lemon zest until smooth.",
      "In a clean bowl, whip egg whites to soft peaks.",
      "Combine wet and dry ingredients gently, then fold in whipped egg whites in two additions.",
      "Cook ladlefuls on a buttered griddle over medium-low heat for 3 mins until bubbles form; flip and cook 2 mins more.",
      "Stack tall and spoon blueberry compote on top."
    ],
    author: "Pastry Chef Pierre",
    createdAt: "2026-08-28T09:10:00.000Z"
  },
  {
    id: "7",
    title: "Creamy Coconut Thai Red Curry with Butternut Squash",
    description: "Rich, fragrant lemongrass curry simmered with tender butternut squash, bamboo shoots, red bell peppers, and fresh Thai basil.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1000&q=80",
    category: "Vegan",
    difficulty: "Medium",
    cookingTime: 35,
    rating: 4.8,
    ingredients: [
      "1 can (400ml) full-fat coconut milk",
      "3 tbsp vegan Thai red curry paste",
      "300g butternut squash, peeled and cubed",
      "1 red bell pepper, sliced",
      "1 cup sugar snap peas",
      "1 can sliced bamboo shoots, drained",
      "1 tbsp coconut sugar",
      "1 tbsp soy sauce or tamari",
      "Juice of 1 lime",
      "1 cup fresh Thai holy basil leaves",
      "Steamed Jasmine rice for serving"
    ],
    instructions: [
      "Heat 3 tablespoons of coconut cream in a deep wok over medium heat until fragrant oil separates.",
      "Add red curry paste and fry for 2 minutes until aromatic and vibrant.",
      "Pour in remainder of coconut milk along with 1/2 cup water, coconut sugar, and soy sauce.",
      "Add butternut squash, cover, and simmer for 15 minutes until tender.",
      "Stir in red pepper, snap peas, and bamboo shoots; cook for 4 more minutes.",
      "Remove from heat, stir in fresh lime juice and Thai basil leaves. Serve with hot jasmine rice."
    ],
    author: "Elena Rostova",
    createdAt: "2026-08-30T13:20:00.000Z"
  },
  {
    id: "8",
    title: "Classic Italian Tiramisu with Espresso & Mascarpone",
    description: "Authentic Treviso dessert layered with espresso-dipped Savoiardi ladyfingers and velvety mascarpone sabayon cream.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=80",
    category: "Desserts",
    difficulty: "Medium",
    cookingTime: 30,
    rating: 5.0,
    ingredients: [
      "250g Italian mascarpone cheese",
      "3 large fresh egg yolks",
      "1/2 cup granulated sugar",
      "1 cup heavy whipping cream",
      "1 1/4 cups freshly brewed strong espresso, cooled",
      "20-24 Italian ladyfingers (Savoiardi)",
      "3 tbsp Dutch-process dark cocoa powder",
      "1 tsp pure vanilla extract"
    ],
    instructions: [
      "Whisk egg yolks and sugar in a heatproof bowl over simmering water for 5 minutes until pale and doubled.",
      "Fold room-temperature mascarpone into the sabayon until completely homogeneous.",
      "In a chilled bowl, whip heavy cream and vanilla to stiff peaks, then gently fold into mascarpone mixture.",
      "Quickly dip each ladyfinger into cooled espresso (1 second per side) and arrange a tight bottom layer in an 8x8 dish.",
      "Spread half the mascarpone cream over ladyfingers. Repeat with another layer of dipped cookies and cream.",
      "Chill for at least 4 hours (or overnight). Dust generously with Dutch cocoa powder immediately before serving."
    ],
    author: "Pastry Chef Pierre",
    createdAt: "2026-09-01T15:40:00.000Z"
  },
  {
    id: "9",
    title: "Zesty 20-Minute Mediterranean Chickpea Salad",
    description: "Crisp cucumber, cherry tomatoes, kalamata olives, diced bell peppers, and protein-packed chickpeas tossed in lemon oregano vinaigrette.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80",
    category: "Quick Meals",
    difficulty: "Easy",
    cookingTime: 10,
    rating: 4.6,
    ingredients: [
      "2 cans (400g each) chickpeas, rinsed and drained",
      "1 English cucumber, diced",
      "1 pint cherry tomatoes, halved",
      "1/2 cup pitted kalamata olives, sliced",
      "1/2 red onion, finely minced",
      "1/3 cup crumbled Greek feta (optional / vegan feta)",
      "1/4 cup extra virgin olive oil",
      "2 tbsp red wine vinegar",
      "1 tsp dried Greek oregano",
      "Salt and fresh black pepper to taste"
    ],
    instructions: [
      "In a small jar, shake olive oil, red wine vinegar, oregano, salt, and black pepper until emulsified.",
      "In a large bowl, combine drained chickpeas, cucumber, cherry tomatoes, olives, and red onion.",
      "Pour vinaigrette over the salad and toss thoroughly to coat.",
      "Top with crumbled feta and fresh chopped parsley. Serve chilled or room temperature."
    ],
    author: "Marcus Vance",
    createdAt: "2026-09-02T11:00:00.000Z"
  }
];

let nextId = 10;

/**
 * Retrieve recipes matching optional query filters
 * @param {Object} filters
 * @param {string} [filters.search] - Search term matching title or ingredients
 * @param {string} [filters.category] - Category filter
 * @param {number|string} [filters.maxTime] - Maximum cooking time filter in minutes
 */
function getAllRecipes(filters = {}) {
  let result = [...recipes];

  // Category filter
  if (filters.category && filters.category.toLowerCase() !== 'all') {
    const targetCategory = filters.category.toLowerCase();
    result = result.filter(r => r.category.toLowerCase() === targetCategory);
  }

  // Search filter (matches title or ingredients as specified in PDF)
  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(r => {
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchIngredient = r.ingredients && r.ingredients.some(ing => ing.toLowerCase().includes(q));
      const matchDesc = r.description && r.description.toLowerCase().includes(q);
      return matchTitle || matchIngredient || matchDesc;
    });
  }

  // Cooking time filter
  if (filters.maxTime) {
    const max = Number(filters.maxTime);
    if (!isNaN(max) && max > 0) {
      result = result.filter(r => r.cookingTime <= max);
    }
  }

  return result;
}

/**
 * Get recipe by ID
 */
function getRecipeById(id) {
  return recipes.find(r => String(r.id) === String(id)) || null;
}

/**
 * Create a new recipe
 */
function createRecipe(data, user = {}) {
  const newRecipe = {
    id: String(nextId++),
    title: data.title.trim(),
    description: data.description ? data.description.trim() : `A delicious homemade ${data.title} recipe.`,
    image: data.image && data.image.trim() ? data.image.trim() : "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1000&q=80",
    category: data.category || "Dinner",
    difficulty: data.difficulty || "Medium",
    cookingTime: Number(data.cookingTime) || 30,
    rating: 5.0, // Initial rating for newly submitted recipes
    ingredients: Array.isArray(data.ingredients)
      ? data.ingredients.map(i => String(i).trim()).filter(Boolean)
      : String(data.ingredients).split('\n').map(i => i.trim()).filter(Boolean),
    instructions: Array.isArray(data.instructions)
      ? data.instructions.map(i => String(i).trim()).filter(Boolean)
      : String(data.instructions).split('\n').map(i => i.trim()).filter(Boolean),
    author: user.name || "Community Chef",
    authorId: user.id || null,
    createdAt: new Date().toISOString()
  };

  recipes.unshift(newRecipe);
  return newRecipe;
}

/**
 * Delete a recipe by ID
 */
function deleteRecipe(id) {
  const initialLength = recipes.length;
  const target = getRecipeById(id);
  if (!target) return false;

  recipes = recipes.filter(r => String(r.id) !== String(id));
  return recipes.length < initialLength;
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe
};
