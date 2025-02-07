const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const planetRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

// security related section
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// logging section
app.use(morgan("tiny"));

// app related section
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);
app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
