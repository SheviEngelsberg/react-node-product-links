
const mongoose = require('mongoose');
const ShopType = require('./ShopType');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shopManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    siteLink: { type: String, required: true },
    numberOfLinks: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    type: { type: String, enum: Object.values(ShopType), required: true }
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
