const mongoose = require('mongoose');

//Education schema for storing education information
const EducationSchema = new mongoose.Schema({
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

// Export Education model
module.exports = mongoose.model('Education', EducationSchema);