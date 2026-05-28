import express from "express";
import * as UsersController from "../controllers/users.controller.ts";

const router = express.Router();

router.get("/profile", UsersController.profile);
// router.put("/:id", (res, req, next) => {});
// router.patch("/:id", (res, req, next) => {});

export default router;
