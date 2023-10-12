const express = require("express");
const tasksRoutes = require("./routes/tasks");
const DBConnect = require("./db/connect");
require("dotenv").config();

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasksRoutes);

const spinServer = async () => {
  try {
    await DBConnect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

spinServer();
