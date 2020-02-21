const User = require("../models/User");

exports.login = (req, res) => {

};

exports.logout = (req, res) => {

};

exports.register = async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  const register = await newUser.register();
  console.log(register);
  if (register) {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        res.json({ success: false, message: "username already exists" })
      } else {
        newUser.save().then(newUserResponse => {
          res.json(newUserResponse)
        });
      }
    })
  } else {
    res.json({ success: false, message: "could not create user" })
  }
};
