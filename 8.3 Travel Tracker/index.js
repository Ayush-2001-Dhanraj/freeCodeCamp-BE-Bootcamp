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
  port: "5432",
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const checkVisited = async () => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  const codes = result.rows.map((country) => country.country_code);
  return codes;
};

app.get("/", async (req, res) => {
  const codes = await checkVisited();
  res.render("index.ejs", {
    total: codes.length,
    countries: codes,
  });
});

app.post("/add", async (req, res) => {
  const { country } = req.body;
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) like '%' || $1 || '%'",
      [country.toLowercase()]
    );

    if (result.rows.length) {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [result.rows[0].country_code]
      );
      res.redirect("/");
    } else {
      const codes = await checkVisited();
      res.render("index.ejs", {
        error: "Country Doesn't exists try again.",
        total: codes.length,
        countries: codes,
      });
    }
  } catch (error) {
    const codes = await checkVisited();
    res.render("index.ejs", {
      error: "Country has already been added, try again.",
      total: codes.length,
      countries: codes,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
