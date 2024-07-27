const express = require("express");
const router = express.Router();

const { followUser } = require("../../controllers/user/followUser");
const { updateUser, deletUser } = require("../../controllers/user/modifyUser")

router.get("/follow/:userId", followUser);
router.put("/update", updateUser);
router.delete("/delete", deletUser);

module.exports = router;
