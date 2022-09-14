import express from 'express'
import * as orderController from '../controllers/order.controller.js'
import auth from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/order", auth, orderController.createOrder);
router.delete("/order/:id", auth, orderController.deleteOrder);
router.get("/orders", auth, orderController.listarOrders);


export default router;
