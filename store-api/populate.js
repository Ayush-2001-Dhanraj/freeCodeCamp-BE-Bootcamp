require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const ProductArr = require("./products.json");

const starter = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(ProductArr);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

starter();
