import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API działa poprawnie 😎" });
});

export default router;
