const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullname, email, password } = req.body;

  const isUserExist = await userModel.findOne({
    email,
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const hashpassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullname,
    email,
    password: hashpassword,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function getProfile(req, res) {
  try {
    res.status(200).json({
      user: {
        _id: req.user._id,
        email: req.user.email,
        fullname: req.user.fullname,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
};
