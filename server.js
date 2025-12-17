
const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

// Gunakan Environment Variable di VPS/Heroku/Railway Anda
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/dramacuan',
});

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-drama-cuan-2025';

// Middleware Auth Admin
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// --- AUTH ROUTES ---
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Sesuai permintaan: login sederhana
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Akses Ditolak' });
});

// --- SERIES ROUTES ---
app.get('/api/series', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM series ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/series', authenticateAdmin, async (req, res) => {
  const s = req.body;
  const fields = ['title', 'description', 'category', 'tag', 'type', 'total_episodes', 'free_episodes', 'is_free', 'is_active', 'is_recommended', 'thumbnail', 'cover_video', 'poster'];
  const placeholders = fields.map((_, i) => `$${i + 1}`).join(', ');
  const values = fields.map(f => s[f]);

  try {
    const result = await pool.query(
      `INSERT INTO series (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/series/:id', authenticateAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM series WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- USER ROUTES ---
app.get('/api/users', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch('/api/users/:id/block', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { is_blocked } = req.body;
  try {
    await pool.query('UPDATE users SET is_blocked = $1 WHERE id = $2', [is_blocked, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend Active on port ${PORT}`));
