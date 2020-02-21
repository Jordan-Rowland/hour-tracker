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
  const register = newUser.register();
  if (!register) {
    res.json({ success: false, message: "there was a problem validating user" })
    return
  }
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) {
    res.json({ success: false, message: "username already exists" })
  } else {
    newUser.save().then(newUserResponse => {
      res.json(newUserResponse)
    });
  }
}

//     User.findOne({ email: req.body.email }).then(user => {
//       if (user) {
//         res.json({ success: false, message: "username already exists" })
//       } else {
//         newUser.save().then(newUserResponse => {
//           res.json(newUserResponse)
//         });
//       }
//     })
//   } else {
//     res.json({ success: false, message: "could not create user" })
//   }
//  };
