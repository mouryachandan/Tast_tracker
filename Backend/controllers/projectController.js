import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId });
    if (projects.length >= 4) return res.status(400).json({ message: 'You can only have 4 projects.' });

    const project = new Project({ name: req.body.name, user: req.userId });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
