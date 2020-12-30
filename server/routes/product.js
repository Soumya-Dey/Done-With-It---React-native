const express = require("express");
const { check, validationResult } = require("express-validator");

const authToken = require("../middleware/auth");
const Product = require("../models/Product");

const router = express.Router();

// @route GET api/product
// @desc get all products
// @access Private
router.get("/", authToken, async (req, res) => {
  try {
    const products = await Product.find().populate("seller", [
      "name",
      "email",
      "phone",
      "productListings",
    ]);

    if (products.length === 0 || !products)
      return res.status(400).json({
        errors: [{ msg: "No products available!" }],
      });

    res.json(products);
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route POST api/product
// @desc add new product
// @access Private
router.post(
  "/",
  [
    authToken,
    [
      check("title", "Title is required").notEmpty(),
      check("seller", "Seller id must be a ObjectId").isLength({
        min: 24,
        max: 24,
      }),
      check("priceInDollar", "Price is required").notEmpty(),
      check("category", "Category is required").notEmpty(),
      check("location", "Location is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newProduct = new Product({ ...req.body });
      await newProduct.save();

      res.json(newProduct);
    } catch (error) {
      res.status(500).send("server error");
    }
  }
);

// @route GET api/product/:productId
// @desc get a single product
// @access Private
router.get("/:productId", authToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("seller", [
      "name",
      "email",
      "phone",
      "productListings",
    ]);

    if (!product)
      return res.status(400).json({
        errors: [{ msg: "No product found!" }],
      });

    res.json(product);
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route GET api/product/category/:category
// @desc get products by category
// @access Private
router.get("/category/:category", authToken, async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).populate("seller", [
      "name",
      "email",
      "phone",
      "productListings",
    ]);

    if (!products) {
      return res.status(400).json({
        errors: [{ msg: "No product found!" }],
      });
    }

    res.json(products);
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;
