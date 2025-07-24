// controllers/projectController.js
import Project from '../models/Project.js';

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// CREATE project
export const createProject = async (req, res) => {
  const { title, description, techStack, githubLink, liveDemoLink } = req.body;
  const thumbnail = req.file?.filename;

  if (!title || !description || !techStack || !thumbnail) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  try {
    const newProject = new Project({
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(','),
      githubLink,
      liveDemoLink,
      thumbnail,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// DELETE project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};

// UPDATE project
export const updateProject = async (req, res) => {
  const { title, description, techStack, githubLink, liveDemoLink } = req.body;
  const thumbnail = req.file?.filename;

  try {
    const updatedData = {
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : techStack.split(','),
      githubLink,
      liveDemoLink,
    };

    if (thumbnail) {
      updatedData.thumbnail = thumbnail;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};
