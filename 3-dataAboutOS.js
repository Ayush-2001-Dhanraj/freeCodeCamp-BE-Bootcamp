const os = require("os");

const user = os.userInfo();
console.log(user);

console.log(`System up time is: ${os.uptime()}`);

const osPropeties = {
  name: os.type(),
  release: os.release(),
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
};

console.log(osPropeties);
