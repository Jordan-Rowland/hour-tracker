const User = require("../models/User");

exports.login = (req, res) => {

};

exports.logout = (req, res) => {

};

exports.register = (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  const register = newUser.register();
  if (register) {
    newUser.save().then(newUserResponse => {
      res.json(newUserResponse)
    });
  }
};
