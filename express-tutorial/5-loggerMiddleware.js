const express = require("express");
const logger = require("./logger");
const app = express();

app.use(logger);
// app.use("/api", logger);

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

app.get("/api/products", (req, res) => {
  res.send("<h1>Products</h1>");
});

app.get("/api/items", (req, res) => {
  res.send("<h1>Items</h1>");
});

app.listen(5000, () => console.log("Listening at port 5000"));
