const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

require('dotenv').config(); // load .env variables

// SIGN IN
const signin = async (req, res) => {
  try {
    // Find user by email
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ error: "User not found" });

    // Check password validity
    if (!user.authenticate(req.body.password))
      return res.status(401).json({ error: "Email and password don't match." });

    // Generate JWT token using secret from .env
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Set token in cookie
    res.cookie('t', token, { expire: new Date() + 2222 });
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// SIGN OUT
const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: "Signed out successfully" });
};

// PROTECT ROUTES
const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET, //  use secret from .env
  algorithms: ['HS256'],
  userProperty: 'auth'
});

// AUTHORIZE USER
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

module.exports = { signin, signout, requireSignin, hasAuthorization };
