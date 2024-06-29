const Shop = require('../models/Shop');
const User = require('../models/User');


const getAllShops = async () => {
    try {
        const shops = await Shop.find();
        return shops;
    } catch (error) {
        throw error;
    }
}

const getShopById = async (shopId) => {
    try {
        const shop = await Shop.findById(shopId);
        return shop;
    } catch (error) {
        throw error;
    }
}

const addShop = async ({ name, shopManager, siteLink, numberOfLinks, availability, type }) => {
    try {
        const newShop = new Shop({ name, shopManager, siteLink, numberOfLinks, availability, type });
        await newShop.save();
        return { status: 200, message: 'Success', newShop };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Error: can not add shop' };
    }
};

const updateShopById = async (shopId, updatedShopData) => {
    try {
        const existingShop = await Shop.findOne({ _id: shopId });
        if (!existingShop) {
            return { status: 400, message: 'The shop not exist' };
        }
        updatedShopData.shopManager = existingShop.shopManager;
        updatedShopData.numberOfLinks = existingShop.numberOfLinks;
        updatedShopData.availability = existingShop.availability;
        const updatedShop = await Shop.findByIdAndUpdate(shopId, updatedShopData, { new: true });
        return updatedShop;
    } catch (error) {
        throw error;
    }
}

const deleteShopById = async (shopId) => {
    try {
        if (!shop.availability) {
            await Shop.findByIdAndDelete(shopId);
            return shop; // אם החנות לא זמינה ונמחקה בהצלחה
        }

        return { status: 400, message: 'Cannot delete, the shop is available' };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllShops,
    getShopById,
    addShop,
    updateShopById,
    deleteShopById
};
