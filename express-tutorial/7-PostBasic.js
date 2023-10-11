const express = require("express");
const { people } = require("./data");

const app = express();
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(401).json({ success: false, msg: "Please provide name" });
  return res.status(201).json({ success: true, person: name });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Post");
});

app.listen(5000, () => console.log("Listening at port 5000"));
