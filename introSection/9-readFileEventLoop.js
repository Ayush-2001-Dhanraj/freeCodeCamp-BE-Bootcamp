const { readFile } = require("fs");

console.log("Started the first task ");

readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("First Task completed successfully");
});

console.log("Starting next task...");
