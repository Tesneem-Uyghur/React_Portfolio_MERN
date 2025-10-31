const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./server/routes/auth.routes');
const userRoutes = require('./server/routes/user.routes');
const contactRoutes = require('./server/routes/contact.routes');
const educationRoutes = require('./server/routes/education.routes');
const projectRoutes = require('./server/routes/project.routes');

dotenv.config();

const app = express();
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Use routes
app.use('/api/users', userRoutes);       // <-- make sure it's this line
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/project', projectRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Welcome to My Portfolio application');
});

// ✅ Error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.log(err);
  }
});

// ✅ Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000/');
});

module.exports = app;
