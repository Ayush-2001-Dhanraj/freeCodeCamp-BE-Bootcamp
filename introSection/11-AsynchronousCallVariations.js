const { readFile, writeFile } = require("fs").promises;

// Method 3

const start = async () => {
  const first = await readFile("./content/first.txt", "utf8");
  const second = await readFile("./content/second.txt", "utf8");
  await writeFile(
    "./content/result-promiseOrAsync.txt",
    `New Test: ${first}, ${second}
`,
    { flag: "a" }
  );
};

start();

// Method 2
// const { readFile, writeFile } = require("fs");
// const util = require("util");
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// const start = async () => {
//   const first = await readFilePromise("./content/first.txt", "utf8");
//   const second = await readFilePromise("./content/second.txt", "utf8");
//   await writeFilePromise(
//     "./content/result-promiseOrAsync.txt",
//     `New Test: ${first}, ${second}
// `,
//     { flag: "a" }
//   );
// };

start();

// Method 1
// const { readFile, writeFile } = require("fs");
// const getText = (path) => {
//   return new Promise((resolve, rejected) => {
//     readFile(path, "utf8", (err, result) => {
//       if (err) rejected(err);
//       else resolve(result);
//     });
//   });
// };

// getText("./content/first.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
// getText("./content/second.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
