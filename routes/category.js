import express from "express";


const router = express.Router();

router.post("/addCat", addCategory);
router.post("/deleteCat", deleteCategory);


router.get("/getCat", getCategory);

export default router;
