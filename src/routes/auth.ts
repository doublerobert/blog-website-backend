import express from "express";
import * as AuthController from "../controllers/auth.ts"

const router = express.Router();

router.get("/", AuthController.getAuthenticatedUser);
router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout)

// router.put("/:id", (res, req, next) => {});
// router.patch("/:id", (res, req, next) => {});

export default router;
