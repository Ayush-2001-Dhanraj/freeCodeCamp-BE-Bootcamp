const path = require("path");

console.log(path.sep); //path seperator may be different

const textFilePath = path.join("content", "sub", "text.txt");
console.log(textFilePath);

const textFilePathWithDir = path.join(__dirname, "content", "sub", "text.txt");
console.log(textFilePathWithDir);

const textFileAbsolutePath = path.resolve("content", "sub", "text.txt");

console.log(textFileAbsolutePath);
