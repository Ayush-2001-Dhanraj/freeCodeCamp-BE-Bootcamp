const http = require("http");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.end("This is the home page!");
      break;
    case "/about":
      res.end("This is the about page! Serving history!! Hunty...");
      break;

    default:
      res.end(`
      <h1>Oops!!</h1>
      <p>You did it again!!</p>
      <a href="/">Home page</a>
      `);
      break;
  }
});

server.listen(5000, (err) => {
  if (err) console.log(err);
  else console.log("Listening at port 5000");
});
