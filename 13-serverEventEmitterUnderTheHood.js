const http = require("http");

const server = http.createServer();

// using EventEmitter under the hood
server.on("request", (req, res) => {
  res.end("Hello Shitty people");
});

server.listen(5000, () => console.log("Listening at port 5000..."));
