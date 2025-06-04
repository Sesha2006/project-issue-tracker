const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create Issue
router.post('/', async (req, res) => {
  const { projectId, title, description, status, priority } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO issues (project_id, title, description, status, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [projectId, title, description, status, priority]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get All Issues
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM issues');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
