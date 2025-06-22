const express = require("express");
const { handleCategory } = require("../controllers/categoryController");
const { isAdmin, auth } = require("../middleware/authMiddleware");
const categoryValidation = require("../middleware/categoryWiddleware");

const router = express.Router();

router.post("/add-category", categoryValidation, auth, isAdmin,  handleCategory)


module.exports = router;
