const express = require("express");
const peopleRoutes = require("./routes/people");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", authRoutes);
app.use("/api/people", peopleRoutes);

app.listen(5000, () => console.log("Listening at port 5000"));
