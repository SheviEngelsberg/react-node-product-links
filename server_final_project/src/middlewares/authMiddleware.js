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
    const { shopId } = req.params; // קבלת ה-shopId מהפרמטרים של ה-URL
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const { userId } = req.user; // קבלת ה-userId מה-req.user (המשתמש המחובר)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // בדיקה אם המשתמש המחובר הוא מנהל האתר
    if (user.type === 'siteAdmin') {
      req.shop = shop; // שמירת החנות בפרמטר req לשימוש בראוט הבא
      return next();
    }

    // בדיקה אם המשתמש המחובר הוא shopManager של החנות
    if (shop.shopManager.toString() === userId) {
      req.shop = shop; // שמירת החנות בפרמטר req לשימוש בראוט הבא
      return next();
    }

    // אם המשתמש לא מנהל האתר ולא מנהל החנות, נחזיר תשובת לא מורשה
    return res.status(403).json({ message: 'Unauthorized access to this shop' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
  

module.exports = {
  verifyToken,
  isSiteAdmin,
  isMyShopManager
};
