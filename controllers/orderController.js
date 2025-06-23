const Order = require("../models/OrderModel");
const Product = require("../models/productModel");

const User = require("../models/userModel");

// order an item
const handlePlaceAnOrder = async (req, res) => {
  const { email, _id, items, price, quantity, total, stock } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User account not found" });
    }

    const existingProduct = await Product.findOne({ itemsId: _id });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.stock < quantity) {
      return res.status(404).json({ message: " Not enough stock" });
    }

    existingProduct.stock -= quantity;

    existingProduct.save();

    const cost = existingProduct.price * quantity;

    const newOrder = new Order({
      orderId: new Date().getTime(),
      items,
      total: cost,
      quantity,
    });

    await newOrder.save();

    return res
      .status(200)
      .json({
        message: "New order successful",
        newOrder,
        updatedProduct: existingProduct,
      });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

// update the status of an item ordered
const handleUpdateOrderStutus = async (req, res) => {
  const { _id } = req.body;

  const { status } = req.body;

  try {
    const orderDetails = await Order.findOne({ orderId: _id });

    if (!orderDetails) {
      return res.status(404).json({ message: "Order information not found" });
    }

    const updateStatus = await Order.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    await updateStatus.save();

    return res
      .status(200)
      .json({ message: "Status updated successfully", updateStatus });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// view all order
const handleGetAllOrders = async (req, res) => {
  try {
    const orderDetails = await Order.find();

    if (!orderDetails) {
      return res
        .status(404)
        .json({ message: "Order details not found. Carry out a new order" });
    }

    return res.status(200).json({ message: "Successful", orderDetails });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

module.exports = {
  handlePlaceAnOrder,
  handleUpdateOrderStutus,
  handleGetAllOrders,
};
