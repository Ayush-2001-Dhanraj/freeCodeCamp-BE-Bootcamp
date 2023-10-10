const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   const filePath = path.join(__dirname, "navbar-app", "index.html");
//   res.status(200).sendFile(filePath);
// });

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

app.listen(5000, () => console.log("Listening at port 5000"));
