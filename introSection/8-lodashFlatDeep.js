const _ = require("lodash");

const arr = [1, [2, [3, [4, [6, [7]]]]]];

console.log(_.flattenDeep(arr));
