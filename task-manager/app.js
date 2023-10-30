const express = require("express");
const tasksRoutes = require("./routes/tasks");
const DBConnect = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasksRoutes);
app.use(notFound);
app.use(errorHandler);

const spinServer = async () => {
  try {
    await DBConnect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

spinServer();
