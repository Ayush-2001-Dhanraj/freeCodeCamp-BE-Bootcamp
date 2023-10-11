const getTasks = (req, res) => {
  res.send("Get all Tasks");
};
const createTask = (req, res) => {
  res.json(req.body);
};
const getTask = (req, res) => {
  res.json({ id: req.params.id });
};
const updateTask = (req, res) => {
  res.json({ id: req.params.id, body: req.body });
};
const deleteTask = (req, res) => {
  res.json({ id: req.params.id, success: true });
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
