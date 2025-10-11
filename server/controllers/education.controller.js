const Education = require('../models/education.model');

// Create new education
exports.create = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all educations
exports.getAll = async (req, res) => {
  try {
    const education = await Education.find();
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get education by ID
exports.getById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update education by ID
exports.update = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete education by ID
exports.deleteOne = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all educations
exports.deleteAll = async (req, res) => {
  try {
    await Education.deleteMany({});
    res.status(200).json({ message: 'All educations deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};