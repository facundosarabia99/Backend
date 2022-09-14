import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import auth from '../middlewares/auth.middleware.js'
const router = express.Router();

router.post("/cart/:user", auth, cartController.createCart);
router.put("/cart/:id/productos", auth, cartController.agregarProductosCart);
router.delete("/cart/:id", auth, cartController.deleteCart);
router.delete(
  "/cart/:id/productos/:id_prod",
  auth,
  cartController.deleteProductosCart
);
router.delete("/cart/:id/clear", auth, cartController.clearCart);
router.get("/cart/:id/productos", auth, cartController.listarProductosCartById);

export default router;
