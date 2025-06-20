

const validateOrder = async (req, res, next)=>{

    const { email, items, quantity, total, stock} = req.body

    const errors = []

    if(!email){
        errors.push("your email is required")
    }

    // if(items[!product]){
    //      errors.push("product is required")
    // }

    if(!quantity){
         errors.push("quantity is required")
    }

    if(quantity > stock){
        errors.push("Insufficent stock")
    }

    if(stock == 0 ){
        errors.push("Product is not available")
    }

    if(errors.length > 0 ){
        return res.status(200).json({message: errors})
    }

    next()
}

const validateUpdateStatus = async(req, res, next)=>{
    const { _id } = req.body

    const errors = []

    if(!_id){
        errors.push("id is required")
    }

    if(errors.length > 0 ){
        return res.status(200).json({message: errors})
    }

    next()
}

module.exports = {
    validateOrder,
    validateUpdateStatus
}