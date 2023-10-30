const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Products Route" });
};

const getAllProductsStatic = async (req, res) => {
  // throw new Error("Testing async package");
  const products = await Product.find();

  res.status(200).json({ products });
};

module.exports = { getAllProducts, getAllProductsStatic };
