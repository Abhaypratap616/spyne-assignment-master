const express = require("express");
const router = express.Router();
const authController = require("./auth");
const discussionController = require("./discussion/index");
const userController = require("./user/index");

router.use("/auth", authController);
router.use("/discussion", discussionController);
router.use("/user", userController);

module.exports = router;