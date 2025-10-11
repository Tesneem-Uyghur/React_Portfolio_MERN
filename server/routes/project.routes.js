const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

// GET all projects
router.get('/', projectController.getAll);

// GET project by ID
router.get('/:id', projectController.getById);

// POST (create) new project
router.post('/', projectController.create);

// PUT (update) project by ID
router.put('/:id', projectController.update);

// DELETE project by ID
router.delete('/:id', projectController.deleteOne);

// DELETE all projects
router.delete('/', projectController.deleteAll);

module.exports = router;