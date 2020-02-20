const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
    trim: true
  },
  hours: {
    type: Number,
    required: true,
    default: 20
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);