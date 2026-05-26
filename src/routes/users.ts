import express from "express";

const router = express.Router();

router.get("/", (res, req, next) => {});
router.post("/", (res, req, next) => {});
router.put("/:id", (res, req, next) => {});
router.patch("/:id", (res, req, next) => {});

export default router;
