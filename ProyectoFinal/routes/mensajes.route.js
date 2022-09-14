import express from "express";
import * as mensajesController from "../controllers/mensajes.controller.js";
import auth from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/mensajes", auth, mensajesController.createMensajes);
router.get("/mensajes", auth, mensajesController.listarMensajes);
router.get("/mensajes/:email", auth, mensajesController.listarMensajesByEmail);

export default router;