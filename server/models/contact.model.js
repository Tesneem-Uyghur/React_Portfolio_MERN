const mongoose = require('mongoose');

// Contact schema for storing contact information
const ContactSchema = new mongoose.Schema({
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
  }
});

// Export Contact model
module.exports = mongoose.model('Contact', ContactSchema);