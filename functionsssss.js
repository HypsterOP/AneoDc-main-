/* eslint-disable no-unused-vars */
const chalk = require("chalk");
module.exports.log = log;

function log(type, msggggggggg) {
  if (!type)
    throw new TypeError(`DUMB FUCK U FORGOT THE TYPE : warn, yes, error`);
  if (type === "warn") {
    if (!msggggggggg) return console.log(`asswhole where msg`);
    console.log(chalk.yellow(msggggggggg));
  } else if (type === "yes") {
    if (!msggggggggg) return console.log(`where msg??!?!??`);
    console.log(chalk.green(msggggggggg));
  } else if (type === "error") {
    if (!msggggggggg) return console.log(`imagine forgetting the msg!`);
    console.log(chalk.red(msggggggggg));
  }
}
