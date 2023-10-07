const sayHi = require("./sayHi");
const names = require("./names");
require("./moduleWithNoExport");

sayHi(names.Ayush);
sayHi(names.Dhanraj);
sayHi("Anupam");
