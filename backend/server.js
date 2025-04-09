const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Mock database (replace with real DB in full implementation)
let users = [
  { id: 1, name: 'Admin', email: 'admin@test.com', password: 'hashed_password', role: 'admin' }
];
let stores = [];
let ratings = [];

// Auth Routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && password === 'test') { // In real app, use bcrypt.compare
    res.json({ token: 'mock_jwt_token', role: user.role });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Admin Routes
app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    userCount: users.length,
    storeCount: stores.length,
    ratingCount: ratings.length
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
