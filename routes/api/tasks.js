const express = require("express");
const router = express.Router();

const Task = require("../../models/Task");

// @router GET api/tasks
// @desc   Get all tasks
// @access Public
router.get("/", (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then(Tasks => res.json(Tasks));
});

// @router POST api/tasks
// @desc   Create a task
// @access Public
router.post("/", (req, res) => {
  const newTask = new Task({
    taskName: req.body.taskName,
    hours: req.body.hours
  });

  newTask.save().then(task => res.json(task));
});

// @router DELETE api/tasks/:id
// @desc   Delete a task
// @access Public
router.delete("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({ success: false, error: err }));
})

module.exports = router;