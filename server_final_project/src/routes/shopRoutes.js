const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { verifyToken, isMyShopManager, isSiteAdmin } = require('../middlewares/authMiddleware');
const { validateShopRequest, existShop, notExistShop } = require('../middlewares/validtionShopMiddlware');


// מסלול לשליפת כל החנויות
router.get('/getAllShops', verifyToken, isSiteAdmin, shopController.getAllShops);

// מסלול לשליפת חנות  
router.get('/getShopById/:shopId', verifyToken, isMyShopManager, existShop, shopController.getShopById);

// מסלול להוספת חנות חדשה
router.post('/addShop', verifyToken, isSiteAdmin, validateShopRequest, notExistShop, shopController.addShop);

// מסלול לעדכון חנות 
router.put('/updateShop/:shopId', verifyToken, isMyShopManager, validateShopRequest, existShop, notExistShop, shopController.updateShopById);

// מסלול למחיקת חנות 
router.delete('/deleteShop/:shopId', verifyToken, isMyShopManager, existShop, shopController.deleteShopById);



module.exports = router;
