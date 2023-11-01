const { BadRequestError } = require("../errors");
const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new BadRequestError("Please provide user name and password");

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hunty!! Cunty!! Heyyyy 💅 ${req.username}`,
    secret: `Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
