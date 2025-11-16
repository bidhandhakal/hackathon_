const express = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const imagekit = require("../config/imagekit");
const router = express.Router();

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);
router.get("/user/profile", authMiddleware, authController.getProfile);
router.put("/user/profile", authMiddleware, authController.updateProfile);

// ImageKit authentication endpoint
router.get("/imagekit-auth", authMiddleware, (req, res) => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    res.status(500).json({ message: "Error getting ImageKit auth parameters" });
  }
});

module.exports = router;
