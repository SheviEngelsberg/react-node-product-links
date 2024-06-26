const Joi = require('joi');
const User = require('../models/User');
const Shop = require('../models/Shop');
const shopService = require('../services/shopService');

// Define Joi schema for Shop object validation
const validShop = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z\s]*$/).required().messages({
        'string.pattern.base': 'Shop name can only contain English letters and spaces',
        'any.required': 'Shop name is required'
    }),
    shopManager: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Shop manager must be a valid ObjectId of length 24',
        'any.required': 'Shop manager is required'
    }),
    siteLink: Joi.string().required().messages({
        'any.required': 'Site link is required'
    }),
    numberOfLinks: Joi.number().integer(0).required().messages({
        'number.base': 'Number of links must be an integer',
        'any.required': 'Number of links is required',
    }),
    availability: Joi.boolean().valid(false).required().messages({
        'boolean.base': 'Availability must be a boolean value',
        'any.only': 'Availability must be false when creating the shop'
    }),
    type: Joi.string().valid('games', 'food', 'clothes').required().messages({
        'any.only': 'Shop type must be one of: games, food, clothes',
        'any.required': 'Shop type is required'
    })
}).options({ abortEarly: false });

// Middleware function to validate shop data asynchronously
async function validateShopRequest(req, res, next) {
    try {
        // Validate using Joi schema
        await validShop.validateAsync(req.body);
        if (req.body.numberOfLinks != 0)
            return res.status(400).send('numberOfLinks must be 0 when creating the shop');

        // Check if shop Link already exists
        const existingShop = await Shop.findOne({ siteLink: req.body.siteLink });
        if (existingShop) {
            return res.status(400).send('Shop with this site link already exists');
        }

        // Check if shop name already exists
        const existShop = await Shop.findOne({ name: req.body.name });
        if (existShop) {
            return res.status(400).send('Shop with this name already exists');
        }
        // Check if shop manager (user) exists
        const user = await User.findById(req.body.shopManager);
        if (!user) {
            return res.status(400).send('User with this ID does not exist');
        }

        if (user.type != 'shopManager')
            return res.status(400).send('User with this ID does not shop manager');


        next();
    } catch (error) {
        // Handle Joi validation errors
        if (error.isJoi) {
            const errorMessage = error.details.map(detail => detail.message).join('; ');
            return res.status(400).send(errorMessage);
        }
        // Handle other errors
        console.error(error);
        return res.status(500).send('Server error');
    }
}
const existShop = async (req, res, next) => {
    try {
        const { shopId } = req.params; // קבלת ה-shopId מהפרמטרים של ה-URL
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        req.shop = shop; // שמירת החנות בפרמטר req לשימוש בראוט הבא
        next(); // אם החנות קיימת, נמשיך לפעולה הבאה
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const notExistShop = async (req, res, next) => {
    try {
        const { siteLink } = req.body; // קבלת ה-siteLink מהגוף של הבקשה

        // בדיקה אם כבר קיימת חנות עם אותו siteLink
        const shop = await Shop.findOne({ siteLink });

        if (shop) {
            return res.status(400).json({ message: 'Shop with this site link already exists' });
        }

        next(); // אם החנות לא קיימת, נמשיך לפעולה הבאה
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateShopAvailability = async (req, res, next) => {
    try {
        const shopName = req.path.split('/')[2]; // שליפת שם החנות מהנתיב
        console.log(shopName);
        if (!shopName) {
            return res.status(400).json({ message: 'Shop name is required' });
        }

        const shop = await Shop.findOne({ name: shopName });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        if (!shop.availability) {
            shop.availability = true;
            shopService.updateShopById(shop._id, shop)
        }
        req.shop = shop; // שמירת החנות ב- req לשימוש בראוט הבא
        next(); // אם החנות זמינה, המשך לפעולת הראוט הבאה
    } catch (err) {
        console.error('Error in checkShopAvailability middleware:', err);
        res.status(500).json({ message: 'An error occurred while checking shop availability', error: err.message });
    }
};
module.exports =
{
    validateShopRequest,
    existShop,
    notExistShop,
    updateShopAvailability
};
