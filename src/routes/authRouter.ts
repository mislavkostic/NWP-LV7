import express from "express";
import AuthController from "../controllers/authController";
import { checkUser } from "../middlewares/authMiddleware";

const authRouter = express.Router();
authRouter.get("*", checkUser);
authRouter.get("/register", AuthController.getRegisterView);
authRouter.get("/login", AuthController.getLoginView);
authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);

authRouter.get("/logout", AuthController.logout);

export = authRouter;
