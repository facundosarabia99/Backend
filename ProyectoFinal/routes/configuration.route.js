import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as configurationController from '../controllers/configuration.controller.js'
const router = express.Router();

router.get(
  "/configuration",
  auth,
  configurationController.listarConfiguracion
);

export default router;
