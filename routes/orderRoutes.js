const express = require("express");
const { auth, isAdmin } = require("../middleware/authMiddleware");
const {
  handlePlaceAnOrder,
  handleUpdateOrderStutus,
  handleGetAllOrders,
} = require("../controllers/orderController");
const {
  validateOrder,
  validateUpdateStatus,
} = require("../middleware/orderMiddleware");

const router = express.Router();

router.post("/place-an-order", validateOrder, auth, handlePlaceAnOrder);

router.patch(
  "/update-order-status",
  validateUpdateStatus,
  auth,
  isAdmin,
  handleUpdateOrderStutus
);

router.get("/get-all-order", auth, handleGetAllOrders);

module.exports = router;
