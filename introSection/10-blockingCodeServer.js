const http = require("http");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.end("Home page!");
      break;
    case "/about":
      //   BLOCKING code - blocks every user
      for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
          console.log(`${i} ${j}`);
        }
      }
      res.end("About page!");
      break;

    default:
      res.end("Error page");
      break;
  }
});

server.listen(5000, () => console.log("server listening on port 5000..."));
