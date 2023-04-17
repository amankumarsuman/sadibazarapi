import express from "express";
// import { createCheckoutSession, verifyPayment } from "./paytemPayment";
import {
  createCheckoutSession,
  webhook,
  verifyPayment,
} from "../controller/payments/Payments.js";

const router = express.Router();

router.post("/", createCheckoutSession);
// router.post("/webhook", webhook);
router.post("/verifyPayment", verifyPayment);

export default router;
