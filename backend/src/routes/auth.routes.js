const express = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);
router.get("/user/profile", authMiddleware, authController.getProfile);
router.put("/user/profile", authMiddleware, authController.updateProfile);

module.exports = router;
