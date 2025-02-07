import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisited() {
  const result = await db.query(
    "SELECT * from visited_countries JOIN users ON users.id = user_id WHERE user_id = $1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getAllUsers() {
  const userResponse = await db.query("SELECT * FROM users");
  return userResponse.rows;
}

app.get("/", async (req, res) => {
  // 1. Get all users and set current user to be first entry
  // 2. Get country codes of the current user
  users = await getAllUsers();
  const countries = await checkVisited();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users.find((u) => u.id == currentUserId).color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      `
        (
          SELECT country_code
          FROM countries
          WHERE LOWER(country_name) = $1
        )
        UNION ALL
        (
          SELECT country_code
          FROM countries
          WHERE LOWER(country_name) LIKE '%' || $1 || '%'
          AND LOWER(country_name) <> $1
        )
        LIMIT 1;
        `,
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      users = await getAllUsers();
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: users.find((u) => u.id == currentUserId).color,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    users = await getAllUsers();
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: users.find((u) => u.id == currentUserId).color,
      error: "Country Doesn't exists try again.",
    });
  }
});

app.post("/user", async (req, res) => {
  const { user, add } = req.body;
  if (add) {
    res.render("new.ejs");
  } else {
    if (user) {
      currentUserId = +user;
    }
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const { name, color } = req.body;
  const result = await db.query(
    "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;",
    [name, color]
  );
  const id = result.rows[0].id;
  currentUserId = +id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
