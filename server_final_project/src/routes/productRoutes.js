const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken} = require('../middlewares/authMiddleware');


router.get('/search/TOGO/:product', verifyToken,/* availableShop ,*/ productController.searchProductInToGo);

router.get('/search/Kidichic/:product', verifyToken, productController.searchProductInKidichic);



module.exports = router;
