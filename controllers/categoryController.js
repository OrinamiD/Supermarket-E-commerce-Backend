const Category = require("../models/categoryModel");

const handleCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exist" });
    }

    const categoryName = new Category({
      name,
    });
    await categoryName.save();

    return res
      .status(200)
      .json({ message: " Category added Successfully", categoryName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleCategory,
};
