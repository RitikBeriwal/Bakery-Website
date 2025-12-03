const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// AUTH MIDDLEWARE (CORRECTED)
const protect = require("../middlewares/authMiddleware");

const User = require("../models/User");
const Order = require("../models/Order");

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/profile-pics";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// ----------------------------------------------------
// UPDATE PROFILE
// ----------------------------------------------------
router.put("/update-profile/:id", protect, async (req, res) => {
  try {
    const { name, email, username } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ----------------------------------------------------
// UPLOAD PROFILE PIC
// ----------------------------------------------------
router.put(
  "/upload-profile-pic",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      const user = await User.findById(req.user.id);
      user.profilePic = req.file.path;
      await user.save();

      res.json({
        success: true,
        message: "Profile picture uploaded",
        profilePic: req.file.path,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

/* ============================================================
   DELETE ACCOUNT
============================================================ */
router.delete("/delete-account", protect, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.user.id);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ============================================================
   ADD ADDRESS  (single address — matches your schema)
============================================================ */
router.post("/add-address", protect, async (req, res) => {
  try {
    const { street, city, state, pincode } = req.body;

    if (!street || !city || !state || !pincode)
      return res.status(400).json({ message: "All address fields required" });

    const user = await User.findById(req.user.id);

    user.address = { street, city, state, pincode };
    await user.save();

    res.json({
      success: true,
      message: "Address added successfully",
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ============================================================
   UPDATE ADDRESS (matches your schema)
============================================================ */
router.put("/update-address", protect, async (req, res) => {
  try {
    const { street, city, state, pincode } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.address.street = street || user.address.street;
    user.address.city = city || user.address.city;
    user.address.state = state || user.address.state;
    user.address.pincode = pincode || user.address.pincode;

    await user.save();

    res.json({
      success: true,
      message: "Address updated successfully",
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ============================================================
   ADD PHONE NUMBER
============================================================ */
router.patch("/add-phone", protect, async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone)
      return res.status(400).json({ message: "Phone number required" });

    const user = await User.findById(req.user.id);

    user.phone = phone;
    await user.save();

    res.json({
      success: true,
      message: "Phone number updated successfully",
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ============================================================
   REMOVE PROFILE PICTURE
============================================================ */
router.delete("/remove-profile-pic", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.profilePicture)
      return res.status(400).json({ message: "No profile picture to remove" });

    if (fs.existsSync(user.profilePicture)) {
      fs.unlinkSync(user.profilePicture);
    }

    user.profilePicture = "";
    await user.save();

    res.json({
      success: true,
      message: "Profile picture removed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
