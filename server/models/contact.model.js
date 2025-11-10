const mongoose = require('mongoose');

// Contact schema for storing contact information
const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
   phone: {
    type: String,
    required: false  // Optional field
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

// Export Contact model
module.exports = mongoose.model('Contact', ContactSchema);