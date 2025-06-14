const express = require("express");
const multer = require("multer");
const path = require("path");
const { Product } = require("../models");
const authenticate = require("../middleware/authenticateUser");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

/**
 * POST /api/products
 * Upload a new product (only for authenticated user)
 */
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  const { title, description, price, contact } = req.body;
  const image = req.file ? req.file.filename : null;
  const userId = req.user.id; // from middleware

  try {
    const product = await Product.create({
      title,
      description,
      price,
      contact,
      image,
      sold: false,
      userId,
    });
    res.status(201).json({ message: "Product uploaded", product });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

/**
 * GET /api/products
 * Fetch all products
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(products);
  } catch (err) {
    console.error("Fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/**
 * PATCH /api/products/:id/sold
 * Mark product as sold (only if owner)
 */
router.patch("/:id/sold", authenticate, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const product = await Product.findByPk(productId, {
      attributes: [
        'id', 'title', 'description', 'price',
        'contact', 'image', 'sold', 'userId', 'createdAt', 'updatedAt'
      ]
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.userId !== userId) {
      return res.status(403).json({ error: "Forbidden: Not your product" });
    }

    product.sold = true;
    await product.save();

    res.json({ message: "Product marked as sold", product });
  } catch (err) {
    console.error("Error marking as sold:", err);
    res.status(500).json({ error: "Failed to mark product as sold" });
  }
});

module.exports = router;
