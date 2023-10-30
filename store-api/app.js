require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const erroHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='api/v1/products'>Products Route</a>");
});

app.use("/api/v1/products", productsRoutes);

app.use(notFoundMiddleware);
app.use(erroHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server listening on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
