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
        phone: req.user.phone,
        location: req.user.location,
        bio: req.user.bio,
        category: req.user.category,
        specialties: req.user.specialties,
        availability: req.user.availability,
        profilePhoto: req.user.profilePhoto,
        profilePhotoFileId: req.user.profilePhotoFileId,
        verified: req.user.verified,
        rating: req.user.rating,
        reviews: req.user.reviews,
        completedJobs: req.user.completedJobs,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profile",
    });
  }
}

async function updateProfile(req, res) {
  try {
    const {
      fullname,
      phone,
      location,
      bio,
      category,
      specialties,
      availability,
      profilePhoto,
      profilePhotoFileId,
    } = req.body;

    const updateData = {};
    if (fullname !== undefined) updateData.fullname = fullname;
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (category !== undefined) updateData.category = category;
    if (specialties !== undefined) updateData.specialties = specialties;
    if (availability !== undefined) updateData.availability = availability;
    if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto;
    if (profilePhotoFileId !== undefined)
      updateData.profilePhotoFileId = profilePhotoFileId;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        phone: updatedUser.phone,
        location: updatedUser.location,
        bio: updatedUser.bio,
        category: updatedUser.category,
        specialties: updatedUser.specialties,
        availability: updatedUser.availability,
        profilePhoto: updatedUser.profilePhoto,
        profilePhotoFileId: updatedUser.profilePhotoFileId,
        verified: updatedUser.verified,
        rating: updatedUser.rating,
        reviews: updatedUser.reviews,
        completedJobs: updatedUser.completedJobs,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
};
