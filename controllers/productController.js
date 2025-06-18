const Product = require("../models/productModel");

const handleProduct = async (req, res) => {
  const { name, price, stock, category } = req.body;

  try {
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exist" });
    }

    const newProduct = await Product({
      name,
      price,
      stock,
      category,
    });
    await newProduct.save();

    return res
      .status(200)
      .json({ message: "Product added successfully", newProduct });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

const handleGetAllProducts = async (req, res)=>{

 try {
  
   const allProducts = await Product.find()

  if(!allProducts){
    return res.status(404).json({message: "products does not exist"})
  }
  
  return res.status(200).json({message: "successful", allProducts})

 } catch (error) {

  return res.status(500).json({message: error.message})

 }

}

const handleGetOneProduct = async (req, res)=>{
  
  const { _id } = req.body

  try {

    const neededProduct = await Product.findById(_id)

    if(!neededProduct){
      return res.status(404).json({message: "product not found"})
    }

    return res.status(200).json({message: "Sucessfull", neededProduct})
    
  } catch (error) {
     return res.status(500).json({message: error.message})
  }
}

module.exports = {
  handleProduct,
  handleGetAllProducts,
  handleGetOneProduct
};

