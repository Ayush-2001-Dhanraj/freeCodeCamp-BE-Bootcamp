import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const loginPassword = "ILoveProgramming";
const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

const checkPassword = (req, res, next) => {
  const backURL = req.header("Referer") || "/";
  const { password } = req.body;
  if (password === loginPassword) {
    next();
  } else {
    res.redirect(backURL);
  }
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(checkPassword);

app.post("/check", (req, res) => {
  res.sendFile(__dirname + "/public/secret.html");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
