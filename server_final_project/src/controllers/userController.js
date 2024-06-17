const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    if(users.length === 0)
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
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const signUp = async (req, res) => {
  const { name, password, type } = req.body;
  try {
    const newUser = await userService.signUp({ name, password, type });
    if (newUser.status === 200) {
      res.status(201).json({ message: 'User created successfully', user: newUser.newUser });
    } else {
      res.status(newUser.status).json({ message: newUser.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const signIn = async (req, res) => {
  const { name, password } = req.body;
  try {
    const token = await userService.signIn(name, password);
    if (token.status === 200) {
      res.status(token.status).json({ message: token.message, user: token.user, token: token.token });
    } else {
      res.status(token.status).json({ message: token.message });
    }
  } catch (error) {
    console.error(error);
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