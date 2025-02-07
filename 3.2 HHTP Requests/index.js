import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
