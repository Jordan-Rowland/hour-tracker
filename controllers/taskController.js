const Task = require("../models/Task");
const jwt = require("jsonwebtoken");


exports.getTasks = async (req, res) => {
  req.user_id = jwt.verify(req.params.token, "SECRETKEY");
  const tasks = await Task.find({ user_id: req.user_id }).sort({ date: -1 })
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  try {
    req.user_id = jwt.verify(req.body.token, "SECRETKEY");
    const newTask = new Task({
      name: req.body.name,
      hours: req.body.hours,
      user_id: req.user_id,
      hoursCompleted: req.hoursCompleted,
      color: "grey"
    });
    const newTaskResponse = await newTask.save();
    res.json(newTaskResponse);
  } catch(err) {
    console.log(err);
    res.json({ success: false, message: "invalid token", error: err });
  }
};

exports.updateTask = async (req, res) => {
  try {
    req.user_id = jwt.verify(req.body.token, "SECRETKEY");
    const task = await Task.findById(req.params.id);
    task.hoursCompleted = req.body.hoursCompleted;
    task.color = req.body.color;
    const newTaskResponse = await task.save();
    res.json(newTaskResponse);
  } catch(err) {
    console.log(err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    req.user_id = jwt.verify(req.body.token, "SECRETKEY");
    const task = await Task.findById(req.params.id)
    // TODO:
    // Try to remove the '._id' form the below.
    //    Not sure why that needs to be added?
    if (req.user_id._id === task.user_id) {
      await task.remove()
      res.json({ success: true })
    }
  } catch(err) {
    console.log(err)
    res.status(404).json({ success: false, error: err })
  }
};
