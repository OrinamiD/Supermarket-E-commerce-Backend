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

module.exports = {
  handleProduct,
};
