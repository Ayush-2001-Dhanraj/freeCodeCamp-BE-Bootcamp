const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    return res.status(201).json({ newTask });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id ${req.params.id} found` });
    }

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );

    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id ${req.params.id} found` });
    }

    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });

    if (!task)
      return res
        .status(404)
        .json({ msg: `No task with id ${req.params.id} found` });
    return res.status(200).json({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
