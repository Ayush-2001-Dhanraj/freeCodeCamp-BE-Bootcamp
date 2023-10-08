const { createReadStream } = require("fs");

const stream = createReadStream("./content/bigTextFile.txt", {
  //   encoding: "utf8",
  highWaterMark: 2000,
});

stream.on("data", (result) => {
  console.log(result);
});
stream.on("error", (err) => console.log(err));
stream.on("end", () => console.log("end Reached"));
