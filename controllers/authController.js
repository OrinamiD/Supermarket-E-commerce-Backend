

const bcrypt = require("bcryptjs")


const User = require("../models/userModel")



const handleSignup =  async (req, res )=>{
    try {
        
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if(existingUser){
            return res.status(400).json({ message: "User already exist, please login"})
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            name, email, password: hashPassword
        }) 
        const result = await newUser.save()

        result.password = undefined

        return res.status(200).json({ message: "Registration successful", result})


    } catch (error) {

           return res.status(500).json({ message: error.message})
        
    }
}




module.exports = {
    handleSignup
}