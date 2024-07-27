const express = require("express");
const router = express.Router();
const { JWTMiddleware } = require("../../middlewares/auth");

const privateRoutes = require("./privateRoutes");
const publicRoutes = require("./publicRoutes");

router.use("/private", JWTMiddleware, privateRoutes);
router.use("/public", publicRoutes);

module.exports = router;
