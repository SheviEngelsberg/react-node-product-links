const requestService = require('../services/requestService');

// שליפת כל הבקשות
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// שליפת בקשות לפי חנות  
const getRequestByShopId = async (req, res) => {
  const shopId = req.params.shopId; // כאן אתה צריך shopId ולא requestId
  try {
    const request = await requestService.getRequestById(shopId); // כאן אתה צריך להעביר את shopId
    if (!request) {
      return res.status(404).json({ message: 'request not found' });
    }
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// הוספת בקשה
const addRequest = async (req, res) => {
  const { userId, shopId, productName, content } = req.body;
  try {
    const newRequest = await requestService.addRequest({ userId, shopId, productName, content });
    if (newRequest.status === 200) {
      res.status(201).json({ message: 'request created successfully' });
    } else {
      res.status(newRequest.status).json({ message: newRequest.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// עדכון סטטוס בקשה
const updateRequestStatusById = async (req, res) => {
  const { status } = req.body;
  const requestId = req.params.requestId;
  try {
    const updatedRequest = await requestService.updateRequestStatus(requestId, { status });
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request updated successfully', updatedRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// מחיקת בקשה
const deleteRequestById = async (req, res) => {
  const requestId = req.params.requestId;
  try {
    const deletedRequest = await requestService.deleteRequestById(requestId);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getAllRequests,
  getRequestByShopId,
  addRequest,
  updateRequestStatusById,
  deleteRequestById
};
