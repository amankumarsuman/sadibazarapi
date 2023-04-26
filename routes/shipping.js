import express from "express";
import {
  postShipments,
  updateShipments,
  getShipmentId,
  getShipments,
} from "../controller/shipping/Shipping.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", postShipments);
router.get("/:id", getShipmentId);
router.get("/", getShipments);
router.patch("/:id", updateShipments);

export default router;
