const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("<h1>Homepage</h1>");
});
app.get("/about", (req, res) => {
  res.status(200).send("<h1>AboutPage</h1>");
});
app.all("*", (req, res) => {
  res.status(404).send("<h1>page not found</h1>");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
