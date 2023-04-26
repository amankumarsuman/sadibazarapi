import express from "express";
import { orderConfirmation } from "../controller/notifications/Notifications.js";
import { partnerwithus } from "../controller/notifications/ContactUs.js";

const router = express.Router();

router.post("/order-confirmation", orderConfirmation);
router.post("/contact-us", partnerwithus);

export default router;
