const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    if (users.length === 0)
      return res.status(400).json({ message: 'No users found' });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const signUp = async (req, res) => {
  const { name, password, type } = req.body;
  try {
    // Call the signUp function from userService
    const newUserResponse = await userService.signUp({ name, password, type });

    // Check the status of the response from signUp function
    if (newUserResponse.status === 200) {
      // If user creation was successful, send success response
      res.status(201).json({ message: 'User created successfully', user: newUserResponse.newUser });
    } else if (newUserResponse.status === 400) {
      // If there was a validation error, send bad request response
      res.status(400).json({ message: newUserResponse.message });
    } else {
      // For any other error, send server error response
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    // Handle caught errors
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
      // Call sign-in function from userService and pass userId from req
      const token = await userService.signIn(req.foundUser);
      if (token.status === 200) {
          res.status(token.status).json({ message: token.message, user: token.user, token: token.token });
      } else {
          res.status(token.status).json({ message: token.message });
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  try {
    const updatedUser = await userService.updateUserById(userId, updatedUserData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await userService.deleteUserById(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  signUp,
  signIn,
  updateUserById,
  deleteUserById
};
