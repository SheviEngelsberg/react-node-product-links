const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { updateShopAvailability } = require('../middlewares/validtionShopMiddlware')


router.get('/search/TOGO/:product', verifyToken, updateShopAvailability, productController.searchProductInToGo);

router.get('/search/Kidichic/:product', verifyToken, updateShopAvailability, productController.searchProductInKidichic);



module.exports = router;
