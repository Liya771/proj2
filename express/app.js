const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
