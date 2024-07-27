const express = require("express");
const router = express.Router();

const { getUserByName, getAllUser } = require("../../controllers/user/getUser");

router.get("/get-all-users", getAllUser);
router.get("/get-user-by-name/:name", getUserByName);

module.exports = router;
