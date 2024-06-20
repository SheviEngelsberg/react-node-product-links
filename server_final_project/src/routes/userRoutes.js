const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isSiteAdmin } = require('../middlewares/authMiddleware');
const { validUser, existUser, notExistUser } = require('../middlewares/validtionUserMiddelware')

// Route to get all users (accessible only to SITEADMIN)
router.get('/getAllUsers', verifyToken, isSiteAdmin, userController.getAllUsers);

// Route to get a specific user (accessible only to SITEADMIN)
router.get('/getUser/:userId', verifyToken, isSiteAdmin, existUser, userController.getUserById);

// Route to create a new user (accessible to all)
router.post('/signUp', validUser, notExistUser, userController.signUp);

// Route to sign in (accessible to all)
router.post('/signIn', validUser, existUser, userController.signIn);

// Route to update a user (accessible to all logged-in users)
router.put('/updateUser/:userId', verifyToken, validUser, notExistUser, userController.updateUserById);

// Route to delete a user (accessible to all logged-in users)
router.delete('/deleteUser/:userId', verifyToken, userController.deleteUserById);

module.exports = router;
