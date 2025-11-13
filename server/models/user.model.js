const mongoose = require('mongoose');
const crypto = require('crypto');

// User schema with password encryption
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true
  },
  role: {
  type: String,
  default: "User", // Users created from signup page are normal users
  enum: ["Admin", "User"]
},
  email: {
    type: String,
    trim: true,
    required: 'Email is required',
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  salt: String,  // Random string used for password hashing
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

// Virtual field for password - not stored in database
// When password is set, it generates salt and hashes the password
UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// User methods
UserSchema.methods = {
  // Compare plain text password with hashed password
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  
  // Encrypt password using HMAC-SHA1 algorithm with salt
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
  
  // Generate random salt for password hashing
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

// Export User model
module.exports = mongoose.model('User', UserSchema);