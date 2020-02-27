const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  hours: {
    type: Number,
    required: true,
    default: 20
  },
  hoursCompleted: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  color: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true,
    default: 'grey'
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);


/*

let Task = () => {
  this.homePlanet = "Earth";
}

let user = new User();
User.prototype.jump = function () {...}
module.exports = Task

*/