const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Recipe Sharing API is running',
    timestamp: new Date().toISOString()
  });
});

// Root welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Recipe Sharing API',
    endpoints: {
      health: '/health',
      recipes: '/api/recipes',
      auth: '/api/auth'
    }
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
