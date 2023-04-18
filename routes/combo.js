import express from "express";
import {
  createComboProduct,
  deleteComboProductById,
  getComboProductById,
  getComboProducts,
  updateComboProductById,
} from "../controller/combo/combo.js";

const router = express.Router();

router.get("/", getComboProducts);
router.get("/:id", getComboProductById);
router.post("/addcombo", createComboProduct);
router.patch("/:id", updateComboProductById);
router.delete("/:id", deleteComboProductById);

export default router;
