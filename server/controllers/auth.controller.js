const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

// Load environment variables from .env file
require('dotenv').config();

// Sign in user and return JWT token
const signin = async (req, res) => {
  try {
    // Find user by email
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ error: "User not found" });

    // Check if password matches
    if (!user.authenticate(req.body.password))
      return res.status(401).json({ error: "Email and password don't match." });

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Set cookie and return token with user info
    res.cookie('t', token, { expires: new Date(Date.now() + 2222222) });
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// Clear cookie to sign out user
const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: "Signed out successfully" });
};

// Middleware to verify JWT token
const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
});

// Middleware to check if user is authorized to access resource
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

module.exports = { signin, signout, requireSignin, hasAuthorization };