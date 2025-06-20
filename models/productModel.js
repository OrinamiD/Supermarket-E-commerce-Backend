

const mongoose = require("mongoose")
const Category = require("./categoryModel")

const productSchema = new mongoose.Schema({

    name: {

        type: String,
        // required: [true, 'product name is required'],
        trim: true
   
    },

    price: {

        type: Number,
        default: 0,
        required: [true, 'price is required'],

    
    },

    stock: {

        type: Number,
        // required: [true,' stock is required'],
        default: 0
    
    },

    category: {
        type: mongoose.Schema.Types.String,
        ref: "Category",
        trim: true,
        // required: true

    }


}, {timestamps: true})


const Product = new mongoose.model('Product', productSchema)

module.exports = Product