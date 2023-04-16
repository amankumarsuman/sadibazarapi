import express from "express";
import { addCategory, getCategory } from "../controller/category/Category.js";



const router = express.Router();

router.post("/addCat", addCategory);
// router.post("/deleteCat", deleteCategory);


router.get("/getCat", getCategory);

export default router;
