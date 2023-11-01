const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const authMiddleware = (req, res, next) => {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken || !authorizationToken.startsWith("Bearer ")) {
    throw new UnauthorizedError("No token provided");
  }

  const token = authorizationToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    throw new UnauthorizedError("Not authorized to access this route");
  }
};

module.exports = authMiddleware;
