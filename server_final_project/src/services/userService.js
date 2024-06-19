const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async () => {
  try {
    const users = await User.find();
    if (users.length === 0)
      return [];
    return users;
  } catch (error) {
    throw error;
  }
}

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

const signUp = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = new User(userData);
    await newUser.save();

    return { status: 200, message: 'Success', newUser };
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const signIn = async (foundUser) => {
  try {
      // Generate JWT token
      const token = jwt.sign({ userId: foundUser._id }, 'your_secret_key', { expiresIn: '1h' });
      if (!token)
          return { status: 400, message: 'Token generation failed' };

      // Return the user and token
      return { status: 200, message: 'Login successful', user: foundUser, token };
  } catch (error) {
      console.error(error);
      return { status: 500, message: 'Server error' };
  }
};

const updateUserById = async (userId, updatedUserData) => {
  try {
    const hashedPassword = await hashPassword(updatedUserData.password);
    updatedUserData.password = hashedPassword;
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

const deleteUserById = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

module.exports = {
  getAllUsers,
  getUserById,
  signUp,
  signIn,
  updateUserById,
  deleteUserById,
};
