const express = require("express");
const { handleCategory } = require("../controllers/categoryController");
const { isAdmin, auth } = require("../middleware/authMiddleware");
const validateCategory = require("../middleware/categoryWiddleware");

const router = express.Router();

router.post("/add-category", validateCategory, auth, isAdmin, handleCategory);

module.exports = router;
