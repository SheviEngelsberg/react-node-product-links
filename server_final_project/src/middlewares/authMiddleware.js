const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Shop = require('../models/Shop');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const isSiteAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.type !== 'siteAdmin') {
      return res.status(403).json({ message: 'Unauthorized: Access is denied.' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const isMyShopManager = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);
      const shop = await Shop.findById(req.params.shopId);
      if (!user || user.type !== 'shopManager' || !shop || shop.shopManager.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized: Access is denied.' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
    

module.exports = {
  verifyToken,
  isSiteAdmin,
  isMyShopManager
};
