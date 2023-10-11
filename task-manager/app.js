const express = require("express");
const tasksRoutes = require("./routes/tasks");

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks", tasksRoutes);

app.listen(port, () => console.log(`Listening at port ${port}...`));
