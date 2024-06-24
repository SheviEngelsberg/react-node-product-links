
const mongoose = require('mongoose');

const productRequestSchema = new mongoose.Schema({
    userId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User', 
         required: true 
        },
    shopId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop', 
        required: true 
    },
    productName: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['notProcessed','beProcessed','processed'],
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.nowc
    },
});

const  ProductRequest= mongoose.model('ProductRequest',productRequestSchema);

module.exports = ProductRequest;