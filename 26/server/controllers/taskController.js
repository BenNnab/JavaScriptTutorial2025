// controllers/taskController.js
const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.createTask = async (req, res) => {
  const { title } = req.body;

  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Error creating task" });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, completed },
      { new: true }
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting task" });
  }
};
