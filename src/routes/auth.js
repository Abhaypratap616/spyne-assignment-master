const express = require("express");
const router = express.Router();

const { userLogin, registerUser } = require("../controllers/auth");

router.post("/login", userLogin);
router.post("/register", registerUser);

module.exports = router;
