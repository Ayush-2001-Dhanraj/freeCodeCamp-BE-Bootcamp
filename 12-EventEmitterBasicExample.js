const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("something", (name) => {
  console.log(`Event successfully called by ${name}`);
});
customEmitter.on("something", (name, age) => {
  console.log(`Hi ${name} you are ${age} years of age`);
});

customEmitter.emit("something", "Bobby", 190);
