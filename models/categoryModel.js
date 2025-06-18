

const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        require: [true, 'category name is required'],

    },


}, {timestamps: true})


const Category = new mongoose.model('Category', categorySchema)

module.exports = Category