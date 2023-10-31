const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("Testing async package");
  // const products = await Product.find({name: 'vase table'});
  const products = await Product.find();

  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select, numericFilters } = req.query;
  const queryObject = {};

  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company) queryObject.company = company;
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regex = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    // console.log(filters);
    const allowedFeilds = ["rating", "price"];
    filters.split(",").forEach((query) => {
      const [feild, operator, value] = query.split("-");
      if (allowedFeilds.includes(feild)) {
        queryObject[feild] = { [operator]: Number(value) };
      }
    });
  }

  // console.log(queryObject);

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortQuery = sort.split(",").join(" ");
    // console.log(sortQuery, sort);
    result = result.sort(sortQuery);
  } else {
    result = result.sort("createdAt");
  }

  // select
  if (select) {
    const selectQuery = select.split(",").join(" ");
    // console.log(selectQuery, select);
    result = result.select(selectQuery);
  }

  // limit
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
