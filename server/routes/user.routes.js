const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authCtrl = require('../controllers/auth.controller.js');
const { requireSignin } = require('../controllers/auth.controller');

// ✅ Create a new user (SIGN UP)
router.post('/', userController.create);

// ✅ Protected test route
router.get('/secret', requireSignin, (req, res) => {
  res.json({ message: "Access granted ✅ Protected route working!" });
});

// ✅ Get all users
router.get('/', userController.getAll);

// ✅ Get user by ID
router.get('/:id', userController.getById);

// ✅ Update user
router.put('/:id', authCtrl.requireSignin, authCtrl.hasAuthorization, userController.update);

// ✅ Delete user
router.delete('/:id', authCtrl.requireSignin, authCtrl.hasAuthorization, userController.deleteOne);

module.exports = router;
