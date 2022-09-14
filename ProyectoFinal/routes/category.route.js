import express from 'express'
import * as categoryController from '../controllers/category.controller.js'
import auth from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/category", auth, categoryController.createCategory);
router.put("/category/:id", auth, categoryController.updateCategory);
router.delete("/category/:id", auth, categoryController.deleteCategory);
router.get("/category/:id", auth, categoryController.listarCategoryById);
router.get("/categories", auth, categoryController.listarCategories);

export default router;