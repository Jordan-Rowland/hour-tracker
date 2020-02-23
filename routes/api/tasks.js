const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");

router.get("/:token", taskController.getTasks);
router.post("/", taskController.createTask);
router.post("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;