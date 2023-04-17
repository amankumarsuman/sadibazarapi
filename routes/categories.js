import express from "express";

import auth from "../middleware/auth.js";
import { getCategories } from "../controller/products/categories.js";

const router = express.Router();

router.get("/", getCategories);
// router.get("/recommendations", ProductsRecommendations);
// router.post("/", auth, PostProducts);
// router.patch("/", auth, adminUpdateProducts);
// router.get("/search", productsSearch);
// router.post("/cart", validateCart);
// router.post("/arr", getProductsArr);
// router.patch("/updateQuantity", updateQuantity);

export default router;
