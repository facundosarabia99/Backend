import express from 'express'
import * as userController from '../controllers/user.controller.js'
import auth from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post('/user/register', userController.signUp)
router.post("/user/login", userController.signIn);
router.put("/user/:id", auth, userController.updateUser);
router.delete("/user/:id", auth, userController.deleteUser);
router.post("/user/tokenIsValid", auth, userController.tokenIsValid);
router.get("/users", auth, userController.getUsers);
router.get("/user/:id", auth, userController.getUserById);

export default router;