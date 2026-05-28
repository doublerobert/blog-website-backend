import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({
    success: true,
    message: "Hello There",
  });
});

export default router;
