const { writeFileSync } = require("fs");

for (let i = 0; i < 1000; i++) {
  writeFileSync(
    "./content/bigTextFile.txt",
    `Line number ${i}
`,
    { flag: "a" }
  );
}
