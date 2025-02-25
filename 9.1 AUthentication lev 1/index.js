import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
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

app.get("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("submit.ejs");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", async (req, res) => {
  const { secret } = req.body;
  const { email } = req.user;

  const response = await db.query(
    "UPDATE users SET secret = $1 WHERE email = $2 RETURNING *",
    [secret, email]
  );

  if (response.rows.length) res.redirect("/secrets");
});

app.get("/secrets", async (req, res) => {
  if (req.isAuthenticated()) {
    const { email } = req.user;
    const response = await db.query(
      "SELECT secret from users WHERE email = $1",
      [email]
    );
    res.render("secrets.ejs", {
      secret: response.rows[0].secret
        ? response.rows[0].secret
        : "something...",
    });
  } else {
    res.redirect("/login");
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/secrets",
  })
);

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

passport.use(
  "local",
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

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const retrievedUser = await db.query(
          "SELECT * from users where email = $1",
          [profile.email]
        );

        if (retrievedUser.rows.length) {
          cb(null, retrievedUser.rows[0]);
        } else {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [profile.email, "google"]
          );
          cb(null, newUser.rows[0]);
        }
      } catch (e) {
        return cb(e);
      }
    }
  )
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
