const Task = require("../models/Task");

// @router GET api/tasks
// @desc   Get all tasks
// @access Public
exports.getTasks = (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then(Tasks => res.json(Tasks));
};

// @router POST api/tasks
// @desc   Create a task
// @access Public
exports.createTask = (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    hours: req.body.hours
  });
  newTask.save().then(task => res.json(task));
};

// @router DELETE api/tasks/:id
// @desc   Delete a task
// @access Public
exports.deleteTask = (req, res) => {
  Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({ success: false, error: err }));
};
