const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validation = require('../validations/userValidations')

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

    if (!validation.isValidPassword(userData.password))
      return { status: 400, message: userData.password + ' is not a valid password! Must include at least one digit, one lowercase, one uppercase letter, and one special character' };

    const existingUser = await User.findOne({ name: userData.name });

    if (existingUser) {
      return { status: 400, message: 'User with the same name already exists' };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const isPasswordValid = await User.findOne({password: userData.password});
    if (isPasswordValid) {
      return { status: 400, message: 'The user already exists, please change the password' };
    }


    const newUser = new User(userData);
    await newUser.save();

    return { status: 200, message: 'Success', newUser };
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const signIn = async (name, password) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ name });

    // Check if the user exists
    if (!user) {
      return { status: 400, message: 'User not found' };
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 400, message: 'Invalid password' };
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    // Return the user and token
    return { status: 200, message: 'Login successful', user, token };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Server error' };
  }
};

const updateUserById = async (userId, updatedUserData) => {
  try {
    const existingUser = await User.findOne({ name: updatedUserData.name });

    // אם קיים משתמש עם אותו שם משתמש
    if (existingUser) {

      // בדיקה האם הסיסמה הוזנה תואמת לסיסמה המצויה במסד הנתונים
      const isPasswordValid = await bcrypt.compare(updatedUserData.password, existingUser.password);

      // אם הסיסמה תואמת, מעלים שגיאה כי המשתמש כבר קיים
      if (isPasswordValid) {
        return { status: 400, message: 'The user already exists, please change the name or password' };
      }
    }
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
