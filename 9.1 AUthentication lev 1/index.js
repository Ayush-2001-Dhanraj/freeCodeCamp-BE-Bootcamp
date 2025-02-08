import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";

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

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "TOPSECRET",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
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
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [username, hash]
          );
          const user = result.rows[0];
          req.logIn(user, (err) => {
            console.log(err);
            res.redirect("/secrets");
          });
        }
      });
    } else {
      res.send("User already exists.");
    }
  } catch (e) {
    console.log(e);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/secrets",
  })
);

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const retrievedUser = await db.query(
        "SELECT * from users where email = $1",
        [username]
      );

      if (retrievedUser.rows.length) {
        bcrypt.compare(
          password,
          retrievedUser.rows[0].password,
          (err, result) => {
            if (err) {
              return cb(err);
            } else {
              if (result) {
                return cb(null, retrievedUser.rows[0]);
              } else {
                return cb(null, false);
              }
            }
          }
        );
      } else {
        return cb("User doesn't exists");
      }
    } catch (e) {
      return cb(e);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
