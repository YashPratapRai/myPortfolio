// routes/projectRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', upload.single('thumbnail'), addProject);
router.put('/:id', upload.single('thumbnail'), updateProject);
router.delete('/:id', deleteProject);

export default router;
