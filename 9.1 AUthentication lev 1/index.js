import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "123456",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const containsUsers = await db.query(
      "SELECT * from users where email = $1",
      [username]
    );
    if (!containsUsers.rows.length) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing password", err);
        } else {
          await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [username, hash]
          );
          res.render("secrets.ejs");
        }
      });
    } else {
      res.send("User already exists.");
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const retrievedUser = await db.query(
      "SELECT password from users where email = $1",
      [username]
    );

    if (retrievedUser.rows.length) {
      bcrypt.compare(
        password,
        retrievedUser.rows[0].password,
        (err, result) => {
          if (err) {
            console.log("Eror COmparing passwords", err);
          } else {
            if (result) {
              res.render("secrets.ejs");
            } else {
              res.send("Password doesn't match.");
            }
          }
        }
      );
    } else {
      res.send("User doesn't exists");
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
