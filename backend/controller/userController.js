const { User } = require("../model/User");
const bcrypt = require("bcryptjs");

// Create new user
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const profilePhoto = req.file ? req.file.path : null;
    const userData = { ...req.body, profilePhoto };

    // Build nested address object from flat keys
    userData.address = {
      line1: req.body["address.line1"],
      country: req.body["address.country"],
      state: req.body["address.state"],
      city: req.body["address.city"],
    };

    // Remove flat address keys
    delete userData["address.line1"];
    delete userData["address.country"];
    delete userData["address.state"];
    delete userData["address.city"];

    // Hash password before saving
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const user = new User(userData);
    await user.save();

    const userObj = user.toObject();
    delete userObj.password; // Remove password before sending response

    res.status(201).json(userObj);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
};

// Check if username is available
const checkUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username });
    res.json({ isAvailable: !user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { currentPassword, password, ...updateData } = req.body;

    // Build nested address object from flat keys if present
    if (
      req.body["address.line1"] ||
      req.body["address.country"] ||
      req.body["address.state"] ||
      req.body["address.city"]
    ) {
      updateData.address = {
        line1: req.body["address.line1"],
        country: req.body["address.country"],
        state: req.body["address.state"],
        city: req.body["address.city"],
      };
      delete updateData["address.line1"];
      delete updateData["address.country"];
      delete updateData["address.state"];
      delete updateData["address.city"];
    }

    if (req.file) {
      updateData.profilePhoto = req.file.path;
    }

    // If password update requested
    if (password) {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const userObj = updatedUser.toObject();
    delete userObj.password;

    res.json(userObj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  checkUsername,
  updateUser,
};
