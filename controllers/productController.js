const Product = require("../models/productModel");

// add a product
const handleAddNewProduct = async (req, res) => {
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

// view all products
const handleGetAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    if (!allProducts) {
      return res.status(404).json({ message: "products does not exist" });
    }

    return res.status(200).json({ message: "Access grant successfully", allProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//view one product
const handleGetOneProduct = async (req, res) => {
  const { _id } = req.body;

  try {
    const neededProduct = await Product.findById(_id);

    if (!neededProduct) {
      return res.status(404).json({ message: "product not found" });
    }

    return res.status(200).json({ message: "Access grant Sucessfullly", neededProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update product price
const handleUpdateProductPrice = async (req, res) => {
  const { _id } = req.body;

  const { price } = req.body;

  try {
    const productDetails = await Product.findOne({ productId: _id });

    if (!productDetails) {
      return res.status(404).json({ message: "Product infomation not found" });
    }

    const newPrice = await Product.findByIdAndUpdate(
      _id,
      { price },
      { new: true }
    );
    await newPrice.save();

    return res
      .status(200)
      .json({ message: "Product Price updated successfullly", newPrice });
  } catch (error) {
    return res.status(200).json({ message: error, message });
  }
};

module.exports = {
  handleAddNewProduct,
  handleGetAllProducts,
  handleGetOneProduct,
  handleUpdateProductPrice,
};
