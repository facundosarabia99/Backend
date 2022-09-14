import express from "express";
import * as checkoutController from "../controllers/checkout.controller.js";
import auth from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/checkout/:id", auth, checkoutController.checkoutByCartId);

export default router