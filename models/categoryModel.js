

const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    id: {
        
        type: String,
        require: true,

    },

    name: {
        type: String,
        require: [true, 'category name is required'],

    },


}, {timestamps: true})


const Category = new mongoose.model('Category', categorySchema)

module.exports = Category