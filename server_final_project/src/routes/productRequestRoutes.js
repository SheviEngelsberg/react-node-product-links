const express = require('express');
const router = express.Router();
const productRequestController = require('../controllers/productRequestController');
const { verifyToken, isMyShopManager, isSiteAdmin } = require('../middlewares/authMiddleware');

//מסלול לשליפת כל הבקשות
router.get('/getAllRequests', verifyToken, isSiteAdmin, productRequestController.getAllRequests);

// מסלול לשליפת בקשות לפי חנות  
router.get('/getRequest/:shopId', verifyToken, isMyShopManager, productRequestController.getRequestByShopId);

// מסלול להוספת בקשה
router.post('/addRequest', verifyToken, productRequestController.addRequest);

//מסלול לעדכון סטטוס בקשה  
router.put('/updateRequestStatus/:requestId', verifyToken, isMyShopManager, productRequestController.updateRequestStatusById);

// מסלול למחיקת בקשה 
router.delete('/deleteRequest/:requestId',verifyToken, isMyShopManager, productRequestController.deleteRequestById);



module.exports = router;