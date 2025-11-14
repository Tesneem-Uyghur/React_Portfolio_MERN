const mongoose = require('mongoose');

// Project schema for storing project information
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: String,
    required: false  // Optional
  },
  link: {
    type: String,
    required: false  // Optional
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Export project model
module.exports = mongoose.model('Project', ProjectSchema);