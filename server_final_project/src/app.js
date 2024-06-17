/**
 * Module dependencies and setup
 */
const express = require('express');
const connectDB = require('./database/connectDB');
const userRoutes = require('./routes/userRoutes');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
const { verifyToken, isSiteAdmin, isMyShopManager } = require('./middlewares/authMiddleware');

const app = express();

/**
 * Middleware setup
 */
app.use(express.json()); // Middleware to parse incoming JSON requests

/**
 * Database connection
 */
connectDB(); // Function to connect to MongoDB database

/**
 * Route for authenticated users
 * Responds with a message if the user is authenticated.
 */
app.get('/authenticated', verifyToken, (req, res) => {
    res.json({ message: 'You are authorized to access this route' });
});

/**
 * Route for site admins
 * Requires user to be authenticated and a site admin.
 * Responds with a message indicating access to admin route.
 */
app.get('/siteAdmin', verifyToken, isSiteAdmin, (req, res) => {
    res.json({ message: 'You are authorized to access this admin route' });
});

/**
 * Route for shop managers
 * Requires user to be authenticated and a manager of their own shop.
 * Responds with a message indicating access to admin route.
 */
app.get('/shopManager', verifyToken, isMyShopManager, (req, res) => {
    res.json({ message: 'You are authorized to access this admin route' });
});

/**
 * Route handlers for different resources
 */
app.use('/users', userRoutes);        // Routes for managing users
app.use('/shops', shopRoutes);        // Routes for managing shops
app.use('/product', productRoutes);   // Routes for managing products

/**
 * Server initialization
 */
const PORT = process.env.PORT || 5000; // Default port 5000, can be overridden by environment variable
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
