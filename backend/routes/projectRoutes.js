import express from 'express';
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from '../controllers/projectController.js';

import upload from '../middleware/upload.js'; // Multer middleware

const router = express.Router();

// @route   GET /api/projects
// @desc    Fetch all projects
router.get('/', getProjects);

// @route   POST /api/projects
// @desc    Create a new project with thumbnail upload
router.post('/', upload.single('thumbnail'), createProject);

// @route   DELETE /api/projects/:id
// @desc    Delete a project by ID
router.delete('/:id', deleteProject);

// @route   PUT /api/projects/:id
// @desc    Update a project by ID, including optional new thumbnail
router.put('/:id', upload.single('thumbnail'), updateProject);

export default router;
