const bcrypt = require('bcryptjs');

// Pre-computed hash for 'secret123'
const defaultHash = bcrypt.hashSync('secret123', 10);

let users = [
  {
    id: "1",
    name: "Chef Gordon",
    email: "chef@test.com",
    passwordHash: defaultHash,
    createdAt: "2026-08-01T10:00:00.000Z"
  }
];

let nextUserId = 2;

/**
 * Find user by email (case-insensitive)
 */
function findUserByEmail(email) {
  if (!email) return null;
  return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

/**
 * Find user by ID
 */
function findUserById(id) {
  return users.find(u => String(u.id) === String(id)) || null;
}

/**
 * Create a new user
 */
function createUser({ name, email, passwordHash }) {
  const newUser = {
    id: String(nextUserId++),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return newUser;
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};
