const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { verifyToken, isMyShopManager, isSiteAdmin } = require('../middlewares/authMiddleware');


// מסלול לשליפת כל החנויות
router.get('/getAllShops',/* verifyToken, isSiteAdmin,*/ shopController.getAllShops);

// מסלול לשליפת חנות  
router.get('/getShop/:shopId',/* verifyToken, isSiteAdmin,*/ shopController.getShopById);

// מסלול להוספת חנות חדשה
router.post('/addShop',/* verifyToken, isSiteAdmin, */shopController.addShop);

// מסלול לעדכון חנות 
router.put('/updateShop/:shopId',/* verifyToken, isMyShopManager,*/ shopController.updateShopById);

// מסלול למחיקת חנות 
router.delete('/deleteShop/:shopId',/* verifyToken, isMyShopManager,*/ shopController.deleteShopById);



module.exports = router;
