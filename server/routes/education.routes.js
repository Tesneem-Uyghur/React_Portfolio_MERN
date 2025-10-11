const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');

// GET all qualifications
router.get('/', educationController.getAll);

// GET qualification by ID
router.get('/:id', educationController.getById);

// POST (create) new qualification
router.post('/', educationController.create);

// PUT (update) qualification by ID
router.put('/:id', educationController.update);

// DELETE qualification by ID
router.delete('/:id', educationController.deleteOne);

// DELETE all qualifications
router.delete('/', educationController.deleteAll);

module.exports = router;