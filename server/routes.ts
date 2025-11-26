import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// testowy endpoint
router.get("/", (req, res) => {
  res.json({ message: "Server działa elegancko 🚀" });
});

router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Wiadomość od ${name}`,
      text: message,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Błąd przy wysyłce:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
