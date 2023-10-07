const { writeFileSync, readFileSync } = require("fs");

const first = readFileSync("./content/first.txt", "utf8");
const second = readFileSync("./content/second.txt", "utf8");

writeFileSync(
  "./content/result.txt",
  `The result from both files are
first: ${first}
second: ${second}
`,
  { flag: "a" }
);
