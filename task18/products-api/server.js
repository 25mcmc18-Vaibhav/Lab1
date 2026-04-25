const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

require("./config/db"); // Initialize DB connection

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Products API is running." });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
