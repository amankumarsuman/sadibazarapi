import express from "express";

import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
} from "../controller/orders/Orders.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.get("/", getAllOrders);
router.patch("/:id", updateOrder);

export default router;
