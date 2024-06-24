const ProductRequest = require('../models/ProductRequest');
const Shop = require('../models/Shop');
const User = require('../models/User');

const getAllRequests = async () => {
  try {
    const requests = await ProductRequest.find();
    return requests;
  } catch (error) {
    throw error;
  }
}

const getRequestById = async (shopId) => { // כאן אני משנה ל-shopId
  try {
    const request = await ProductRequest.find({ shopId }); // כאן מחפש לפי shopId
    return request;
  } catch (error) {
    throw error;
  }
}

const addRequest = async ({ userId, shopId, productName, content }) => {
  try {
    const existingUser = await User.findById(userId); // כאן מחפש לפי userId
    const existingShop = await Shop.findById(shopId); // כאן מחפש לפי shopId
    if (!existingUser || !existingShop) {
      return { status: 400, message: 'The shop or user does not exist' };
    }
    const status = 'notProcessed';
    const newRequest = new ProductRequest({ userId, shopId, productName, content, status });
    await newRequest.save();
    return { status: 200, message: 'Success', newRequest };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Error: cannot add request' };
  }
};

const updateRequestStatus = async (requestId, newStatus) => {
  try {
    const existingRequest = await ProductRequest.findById(requestId);
    if (!existingRequest) {
      return { status: 400, message: 'The request does not exist' };
    }
    existingRequest.status = newStatus;
    await existingRequest.save();
    return { status: 200, message: 'Status updated successfully', request: existingRequest };
  } catch (error) {
    throw error;
  }
};

const deleteRequestById = async (requestId) => {
  try {
    const deletedRequest = await ProductRequest.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      return { status: 400, message: 'The request does not exist' };
    }
    return { status: 200, message: 'Request deleted successfully', request: deletedRequest };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRequests,
  getRequestById,
  addRequest,
  updateRequestStatus,
  deleteRequestById
};
