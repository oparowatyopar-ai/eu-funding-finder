import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Główne endpointy
app.get("/", (req, res) => {
  res.json({ message: "Server działa elegancko 🚀" });
});

app.use("/api", routes);

// Start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
