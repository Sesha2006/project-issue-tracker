const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create Project
router.post('/', async (req, res) => {
  const { name, owner_id, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, owner_id, description) VALUES ($1, $2, $3) RETURNING *',
      [name, owner_id, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error inserting project:', err.message);
    res.status(500).send('Server Error');
  }
});

// Get All Projects
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching projects:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
