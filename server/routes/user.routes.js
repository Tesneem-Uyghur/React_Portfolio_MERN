const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET all users
router.get('/', userController.getAll);

// GET user by ID
router.get('/:id', userController.getById);

// POST (create) new user
router.post('/', userController.create);

// PUT (update) user by ID
router.put('/:id', userController.update);

// DELETE user by ID
router.delete('/:id', userController.deleteOne);

// DELETE all users
router.delete('/', userController.deleteAll);

module.exports = router;