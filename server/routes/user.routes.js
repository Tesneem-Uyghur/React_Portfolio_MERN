const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authCtrl = require('../controllers/auth.controller.js');

// Public route - no authentication required
router.post('/', userController.create);

// Protected test route
router.get('/secret', authCtrl.requireSignin, (req, res) => {
  res.json({ message: "Access granted, Protected route working!" });
});

// PROTECTED - Get all users (requires authentication)
router.get('/', authCtrl.requireSignin, userController.getAll);

// PROTECTED - Get user by ID
router.get('/:id', authCtrl.requireSignin, userController.getById);

// PROTECTED - Update user (requires authorization)
router.put('/:id', authCtrl.requireSignin, authCtrl.hasAuthorization, userController.update);

// PROTECTED - Delete user (requires authorization)
router.delete('/:id', authCtrl.requireSignin, authCtrl.hasAuthorization, userController.deleteOne);

module.exports = router;