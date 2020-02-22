const Task = require("../models/Task");
const jwt = require("jsonwebtoken");


exports.getTasks = (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then(Tasks => res.json(Tasks));
};

exports.createTask = async (req, res) => {
  console.log("Create task called");
  try {
    req.user_id = jwt.verify(req.body.token, "SECRETKEY");
    const newTask = new Task({
      name: req.body.name,
      hours: req.body.hours,
      user_id: req.user_id
    });
    const newTaskResponse = await newTask.save();
    res.json(newTaskResponse);
  } catch(err) {
    console.log(err);
    res.json({ success: false, message: "invalid token", error: err });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    req.user_id = jwt.verify(req.body.token, "SECRETKEY");
    const task = await Task.findById(req.params.id)
    if (req.user_id._id === task.user_id) {
      await task.remove()
      res.json({success: true})
    }
  } catch(err) {
    console.log(err)
    res.status(404).json({ success: false, error: err })
  }
};
