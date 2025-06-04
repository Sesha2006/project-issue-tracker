const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create Comment
router.post('/', async (req, res) => {
  const { issueId, author, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO comments (issue_id, author, comment_text) VALUES ($1, $2, $3) RETURNING *',
      [issueId, author, content] // 'content' goes into 'comment_text' column
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting comment:', err.message);
    res.status(500).send('Server Error');
  }
});

// Get All Comments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comments');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving comments:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
