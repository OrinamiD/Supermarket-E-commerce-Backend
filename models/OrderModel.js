

const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: 'product'},
                quantity: {
                    type: Number,
                    require: true}
        }
    ],


    total: {
        type: Number,
        require: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: User,
        require: true
    },

    status: {
        type: String,
        enum: ['pending', 'processing', 'shipping', 'delivered', 'cancelled'],
        default: 'pending'

    },

}, {timestamps: true})


const Order = new mongoose.model('Order', orderSchema)

module.exports = Order