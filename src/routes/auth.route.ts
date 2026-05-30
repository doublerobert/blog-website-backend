import express from "express";
import * as AuthController from "../controllers/auth.controller.ts"

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout)
router.get("/refresh", AuthController.refresh)


export default router;
