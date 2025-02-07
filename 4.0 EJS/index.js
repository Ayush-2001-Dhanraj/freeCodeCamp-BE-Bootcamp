import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  const day = new Date().getDay();
  const dayType = day == 0 || day == 6 ? "the weekend" : "a weekday";
  const msg = day == 0 || day == 6 ? "have fun!" : "work hard!";

  res.render("index.ejs", { dayType, msg });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
