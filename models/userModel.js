

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {

        type: String,
        trim: true,
        require: [true, "name is required"],
        // match: "/^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/"

    
    },

    email: {
        type: String,
        trim: true,
        require: [true, 'email is required'],
        unique: [true, 'email must be unique'],
        minLength: 3,
        maxLength: 60,
        // match: "/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
    
    
    },


    password: {
        type: String,
        trim: true,
        require: [true, 'password is required'],
        // match: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"
    },


    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true})


const User = new mongoose.model('User', userSchema)


module.exports = User