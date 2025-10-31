const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

// Authentication routes
router.post('/signin', authCtrl.signin);   // User login
router.get('/signout', authCtrl.signout);  // User logout

module.exports = router;