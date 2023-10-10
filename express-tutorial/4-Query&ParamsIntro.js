const express = require("express");
const { products } = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.json(products);
});

app.get("/product/:productID", (req, res) => {
  const { productID } = req.params;
  const currentProduct = products.find(
    (product) => product.id === Number(productID)
  );

  if (!currentProduct) {
    res.status(404).send("Product doesn't exists");
  }
  res.json(currentProduct);
});

app.get("/product/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("Yeah!");
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let currentProducts = [...products];

  if (search) {
    currentProducts = currentProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }
  if (limit) {
    currentProducts = currentProducts.slice(0, Number(limit));
  }

  if (currentProducts.length < 1) {
    res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(currentProducts);
});

app.listen(5000, () => {
  console.log("Listening at port 5000");
});
