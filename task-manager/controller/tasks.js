const Task = require("../models/task");
const asyncWrapper = require("../middleware/asyncWrapper");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = await Task.create(req.body);
  return res.status(201).json({ newTask });
});

const getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return res
      .status(404)
      .json({ msg: `No task with id ${req.params.id} found` });
  }

  return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res
      .status(404)
      .json({ msg: `No task with id ${req.params.id} found` });
  }

  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });

  if (!task)
    return res
      .status(404)
      .json({ msg: `No task with id ${req.params.id} found` });
  return res.status(200).json({ task });
});

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
