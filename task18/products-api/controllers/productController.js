const db = require("../config/db");

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
    res.status(200).json({ count: rows.length, products: rows });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ product: rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// POST /api/products  [Protected]
const createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)",
      [name, description || null, price, category || null]
    );
    res.status(201).json({
      message: "Product created successfully.",
      productId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// PUT /api/products/:id  [Protected]
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  try {
    const [existing] = await db.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    await db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE id = ?",
      [name, description, price, category, id]
    );
    res.status(200).json({ message: "Product updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// DELETE /api/products/:id  [Protected]
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [existing] = await db.query("SELECT id FROM products WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};