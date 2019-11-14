#!/usr/bin/env node

import { writeDo } from "./fileaccess";

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const argv = require("minimist")(process.argv.slice(2));
const tasktools = require("./tasks");


console.log(
  chalk.yellow(
    figlet.textSync("do - and remember", { horizontalLayout: "full" })
  )
)



if (argv["s"]) {
  console.log("show stats");
} else if (argv["r"]) {
  console.log("show report");
} else if (argv["a"]) {
  console.log("show everything");
} else if (argv["_"].length > 0) {
  // add a task
  tasktools.addTaskToToday(argv["_"].join(" "));
} else {
  //show all tasks
  tasktools.getTasks()
    .then( tasks => {
      let incompleteTasks = tasks.filter(theTask => {
        return theTask.complete ==false
      });
      if (incompleteTasks.length>0) {
      inquirer
        .prompt([
          {
            type: "checkbox", 
            choices: tasks.filter(theTask => {
              return theTask.complete ==false
            }).map(theTask => {
              let tObj = {};
              tObj['value'] = theTask.id;
              tObj['name'] = theTask.content;
              return tObj;
            }), 
            name: "tasks", 
            message: "What tasks have you completed?"
          }
        ])
        .then(answers => {
          answers['tasks'].forEach(answer => {
            tasks.find(x => x.id === answer).complete = true;
          });
          tasktools.saveTasks(tasks);
          
        })
      }
    })
  // console.log(JSON.stringify(dotasks))
}
