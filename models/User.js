const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.cleanUp = function() {
  if (typeof(this.email) != "string") { this.email = ""; }
  if (typeof(this.password) != "string") { this.password = ""; }
}

UserSchema.methods.validateUser = function() {
  this.email = this.email.toLowerCase();
  if (
      !validator.isEmail(this.email) ||
      this.email.length < 5 ||
      this.password === "" ||
      this.password.length < 6 ||
      this.password.length > 50
    ) {
    console.log("There was a User.validateUser error")
    return false
  }
  return true;
}

UserSchema.methods.login = function() {
  this.cleanUp();
}

UserSchema.methods.register = function() {
  this.cleanUp();
  const validate = this.validateUser();
  if (validate) {
    return true;
  } else {
    return false;
  }
}

module.exports = User = mongoose.model("user", UserSchema);