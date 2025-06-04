const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/projects', require('./routes/projects'));
app.use('/issues', require('./routes/issues'));
app.use('/comments', require('./routes/comments'));

// Root route message
app.get('/', (req, res) => {
  res.send('🎯 Project Issue Tracker API is running! Use Thunder Client (VsCode) or Postman to test /projects, /issues, /comments');
});

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
