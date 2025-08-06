// controllers/projectController.js

import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// ADD new project
export const addProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveDemoLink } = req.body;

    // Validate required fields
    if (!title || !description || !techStack || !githubLink || !liveDemoLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const techArray = Array.isArray(techStack) ? techStack : techStack.split(',').map(tech => tech.trim());

    const newProject = new Project({
      title,
      description,
      techStack: techArray,
      githubLink,
      liveDemoLink,
      thumbnail: req.file?.filename || '',
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// UPDATE existing project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProject = await Project.findById(id);
    if (!existingProject) return res.status(404).json({ message: 'Project not found' });

    const { title, description, techStack, githubLink, liveDemoLink } = req.body;
    const techArray = Array.isArray(techStack)
      ? techStack
      : techStack?.split(',').map(tech => tech.trim());

    // Remove old thumbnail if new one uploaded
    if (req.file && existingProject.thumbnail) {
      const oldPath = path.join(uploadDir, existingProject.thumbnail);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    existingProject.title = title || existingProject.title;
    existingProject.description = description || existingProject.description;
    existingProject.techStack = techArray || existingProject.techStack;
    existingProject.githubLink = githubLink || existingProject.githubLink;
    existingProject.liveDemoLink = liveDemoLink || existingProject.liveDemoLink;
    if (req.file) existingProject.thumbnail = req.file.filename;

    await existingProject.save();
    res.status(200).json(existingProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// DELETE project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });

    // Delete thumbnail file if exists
    if (deletedProject.thumbnail) {
      const thumbPath = path.join(uploadDir, deletedProject.thumbnail);
      if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
