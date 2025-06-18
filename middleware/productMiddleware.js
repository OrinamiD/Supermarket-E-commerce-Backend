const validateProduct = async (req, res, next) => {
  const { name, price, stock, category } = req.body;

  const errors = [];

  if (!name) {
    errors.push("Product name is required");
  }
  if (!price) {
    errors.push("Product price is required");
  }
  if (!stock) {
    errors.push("Product stock is required");
  }
  if (!category) {
    errors.push("Product category is required");
  }

  if (errors.length > 0) {
    return res.status(200).json({ message: errors });
  }

  next();
};


module.exports = {
    validateProduct
}
