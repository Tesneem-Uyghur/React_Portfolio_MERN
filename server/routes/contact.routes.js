const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// GET all contacts
router.get('/', contactController.getAll);

// GET contact by ID
router.get('/:id', contactController.getById);

// POST (create) new contact
router.post('/', contactController.create);

// PUT (update) contact by ID
router.put('/:id', contactController.update);

// DELETE contact by ID
router.delete('/:id', contactController.deleteOne);

// DELETE all contacts
router.delete('/', contactController.deleteAll);

module.exports = router;