const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  const user = new User(req.body);
  const currentUser = await User.findOne({ email: req.body.email })
  if (currentUser &&
      bcrypt.compareSync(
        req.body.password,
        currentUser.password
      )
    ) {
    res.json(
    { token:
      // jwt.sign creates and stores data in the token
      jwt.sign(
        { _id: currentUser._id },
        process.env.JWTSECRET,
        { expiresIn: "7d" }
      ),
      success: true,
      message: "successfully logged in"
    })
    user.login();
  } else {
    res.json({ success: false, message: "invalid username / password" })
  }
};

exports.logout = (req, res) => {
  jwt.sign({ _id: currentUser._id, iat: Math.floor(Date.now() / 1000) - 30 }, process.env.JWTSECRET);
};

exports.register = async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  const register = newUser.register();
  if (!register) {
    res.json({ success: false, message: "there was a problem validating user. please make sure you enter a valid username" })
    return
  }
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) {
    res.json({ success: false, message: "username already exists" })
  } else {
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt)
    newUser.save().then(newUserResponse => {
      res.json({ token:
        jwt.sign(
          { _id: newUserResponse._id },
          process.env.JWTSECRET,
          { expiresIn: "7d" }
        ),
        success: true,
        message: "successfully logged in",
        ...newUserResponse
      });
    })
  }
}


exports.verify = async (req, res) => {
  const token = req.body.token
  const verified = jwt.verify(token, process.env.JWTSECRET)
  if (verified) {
    res.json({ success: true, message: "token verified" })
  } else {
    res.json({ success: false, message: "could not verify token" })
  }
}
