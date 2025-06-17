

const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name: {

        type: string,
        require: [true, 'product name is required'],
        trim: true
    
    },

    price: {

        type: Number,
        default: 0,
        require: [true, 'price is required'],

    
    },

    stock: {

        type: Boolean,
        enum: ['false', 'true'],
        default: false,
    
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        require: true

    }


}, {timestamps: true})


const Product = new mongoose.model('Product', productSchema)

module.exports = Product