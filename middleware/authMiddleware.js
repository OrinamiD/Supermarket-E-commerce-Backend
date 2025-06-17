
const joi = require("joi")

const AuthSignup = async (req, res, next)=>{

    const { name, email, password } = req.body

    const errors = []

    if(!name){
        errors.push("Provide your name")
    }

    if(!email){
        errors.push("Provide your email")
    }

      if(!password){
        errors.push("Provide your password")
    }

    if(errors.length > 0 ){
        return res.status(200).json({message: errors})
    }

    const signupSchema = joi.object({
       
        name: joi.string()
        .required()
        .pattern(new RegExp("^[A-Za-z\s'-]{2,}$"))
        .messages({
            'string.pattern.base': "Name must contain only alphabetic characters, spaces, apostrophes, or hyphens. Numbers and special symbols are not allowed.",
           

        }),            


        email: joi.string()
        .required()
        .min(4)
        .max(60)
        .pattern(new RegExp("^[^@]+@[^@]+\.[^@]+$"))
        .messages({
        'string.pattern.base': "Please enter a valid email address (e.g., name@example.com).",
        'string.email': "Please enter a valid email address.",
      
    }),


        password: joi.string()

        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .messages({
            'string.pattern.base': "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
          

        })

        
    })

    const { error } = signupSchema.validate({ name, email, password})

    if(error){
        return res.status(400).json({ message: error.message})
    }

    next()
    
}


module.exports = {
  AuthSignup
};
