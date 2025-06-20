

const mongoose = require("mongoose")
const Product = require("./productModel")
const User = require("./userModel")

const orderSchema = new mongoose.Schema({
  items: {
    type: String
  },
    
        // Product: {
        //     type: mongoose.Schema.Types.String, ref: Product,
        // },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    
  

    total: {
        type: Number,
        default: 0,

    },
    
    userId: {
        type: mongoose.Schema.ObjectId, ref: User,


    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipping', 'delivered', 'cancelled'],
        default: 'pending'
    },
}, {timestamps: true})

const Order = new mongoose.model('Order', orderSchema)

module.exports = Order