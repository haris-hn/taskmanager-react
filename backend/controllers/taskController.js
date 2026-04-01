const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    let query = { user: req.user._id };
    
    // If admin, show all tasks
    if (req.user.role === 'admin') {
      query = {};
    }

    const tasks = await Task.find(query)
      .populate('user', 'email')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Create task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = new Task({ title, description, status, user: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    let query = { _id: req.params.id, user: req.user._id };
    
    // If admin, they can update any task
    if (req.user.role === 'admin') {
      query = { _id: req.params.id };
    }

    let task = await Task.findOne(query);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    let query = { _id: req.params.id, user: req.user._id };
    
    // If admin, they can delete any task
    if (req.user.role === 'admin') {
      query = { _id: req.params.id };
    }

    let task = await Task.findOneAndDelete(query);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};
