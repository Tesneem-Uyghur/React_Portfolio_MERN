const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./server/routes/auth.routes');
const userRoutes = require('./server/routes/user.routes');
const contactRoutes = require('./server/routes/contact.routes');
const educationRoutes = require('./server/routes/education.routes');
const projectRoutes = require('./server/routes/project.routes');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/project', projectRoutes);

// Root route for testing server status
app.get('/', (req, res) => {
  res.send('Welcome to My Portfolio application');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Handle JWT authentication errors
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    // Handle all other errors
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.log(err);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

module.exports = app;