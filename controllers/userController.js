const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const user = new User(req.body);
  const currentUser = await User.findOne({ email: req.body.email })
  if (currentUser &&
      bcrypt.compareSync(
        req.body.password,
        currentUser.password
      )
    ) {
    // EDIT THE JWT KEY
    res.json(
    { token:
      // jwt.sign creates and stores data in the token
      jwt.sign(
      { _id: currentUser._id },
      "SECRETKEY",
      { expiresIn: "7d" }
    ),
      success: true,
      message: "Successfully logged in"
    })
    console.log("successfully logged in")
    user.login();
  } else {
    res.json({ success: false, message: "invalid username / password" })
    console.log("invalid username / password")
  }
};

exports.logout = (req, res) => {

};

exports.register = async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  const register = newUser.register();
  if (!register) {
    res.json({ success: false, message: "there was a problem validating user" })
    return
  }
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) {
    res.json({ success: false, message: "username already exists" })
  } else {
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt)
    newUser.save().then(newUserResponse => {
      res.json(newUserResponse);
    });
  }
}
