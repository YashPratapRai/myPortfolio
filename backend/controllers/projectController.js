import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';

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

    if (!title || !description || !techStack || !githubLink || !liveDemoLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const techArray = Array.isArray(techStack)
      ? techStack
      : techStack.split(',').map(tech => tech.trim());

    const newProject = new Project({
      title,
      description,
      techStack: techArray,
      githubLink,
      liveDemoLink,
      thumbnail: req.file?.path || '', // ✅ Cloudinary URL
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// UPDATE project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, techStack, githubLink, liveDemoLink } = req.body;

    const techArray = Array.isArray(techStack)
      ? techStack
      : techStack?.split(',').map(tech => tech.trim());

    // ✅ Delete old image from Cloudinary (IMPORTANT)
    if (req.file && existingProject.thumbnail) {
      const publicId = existingProject.thumbnail
        .split('/')
        .pop()
        .split('.')[0];

      await cloudinary.uploader.destroy(`projects/${publicId}`);
    }

    existingProject.title = title || existingProject.title;
    existingProject.description = description || existingProject.description;
    existingProject.techStack = techArray || existingProject.techStack;
    existingProject.githubLink = githubLink || existingProject.githubLink;
    existingProject.liveDemoLink = liveDemoLink || existingProject.liveDemoLink;

    if (req.file) {
      existingProject.thumbnail = req.file.path; // ✅ new Cloudinary URL
    }

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

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // ✅ Delete image from Cloudinary
    if (deletedProject.thumbnail) {
      const publicId = deletedProject.thumbnail
        .split('/')
        .pop()
        .split('.')[0];

      await cloudinary.uploader.destroy(`projects/${publicId}`);
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};