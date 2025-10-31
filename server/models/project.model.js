const mongoose = require('mongoose');

//Project schema for storing project information
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  completion: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
// Export project model
module.exports = mongoose.model('Project', ProjectSchema);