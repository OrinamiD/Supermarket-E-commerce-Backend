

const categoryValidation = async (req, res, next)=>{
    const { name } = req.body

    const errors = []

     if(!name){
        errors.push("Provide the name of the category")
     }

     if(errors.length > 0 ){
        return res.status(403).json({message: errors})
     }

     next()
               
}


module.exports = categoryValidation