import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  try {
    const profilePhoto = req.file ? req.file.path : null;
    const userData = { ...req.body, profilePhoto };
    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findOne({ username });
    res.json({ isAvailable: !user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { currentPassword, newPassword, ...updateData } = req.body;
    
    if (req.file) {
      updateData.profilePhoto = req.file.path;
    }

    if (newPassword) {
      const user = await User.findById(req.params.id);
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
      updateData.password = newPassword;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};