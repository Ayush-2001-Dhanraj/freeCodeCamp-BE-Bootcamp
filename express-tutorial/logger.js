const logger = (req, res, next) => {
  const { method, url, user } = req;
  const year = new Date().getFullYear();
  console.log(method, url, user, year);
  next();
};

module.exports = logger;
