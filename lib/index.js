#!/usr/bin/env node
"use strict";
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const argv = require("minimist")(process.argv.slice(2));
console.log(chalk.yellow(figlet.textSync("do - and remember", { horizontalLayout: "full" })));
if (argv["s"]) {
    console.log("show stats");
}
else if (argv["r"]) {
    console.log("show report");
}
else if (argv["a"]) {
    console.log("show everything");
}
else if (argv["_"].length > 0) {
    console.log(argv["_"]);
}
else {
    console.log("show all tasks!!");
}
