const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");


router.get("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);

module.exports = router;