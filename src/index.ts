#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const argv = require("minimist")(process.argv.slice(2));
const tasktools = require("./tasks");
const {DateTime} = require("luxon");
// const clipboardy = require('clipboardy');
console.log(
  chalk.yellow(
    figlet.textSync("do - and remember", { horizontalLayout: "full" })
  )
)



if (argv["s"]) {
  console.log("show stats");
} else if (argv["r"]) {
  console.log("show report");
  tasktools.getTasks()
    .then(tasks => {
      let doneYesterday = tasks.filter(theTask => {
        let yesterday = DateTime.local().minus({days: 1}).toISODate();
        return theTask.addDate === yesterday && theTask.didit === true
      });
      let doingToday = tasks.filter(theTask => {
        let today = DateTime.local().toISODate();
        return theTask.addDate === today
      });
      let output = `1) ${doneYesterday.map(item => item.content)}\n2) ${doingToday.map(item => item.content)}`
      console.log(output);
      // clipboardy.write(output);
    })
} else if (argv["a"]) {
  console.log("show everything");
} else if (argv["_"].length > 0) {
  // add a task
  tasktools.addTaskToToday(argv["_"].join(" "), !argv["y"]);
} else {
  //show all tasks
  tasktools.getTasks()
    .then( tasks => {
      let undoneTasks = tasks.filter(theTask => {
        return theTask.didit ==false
      });
      if (undoneTasks.length>0) {
      inquirer
        .prompt([
          {
            type: "checkbox", 
            choices: undoneTasks.map(theTask => {
              let tObj = {};
              tObj['value'] = theTask.id;
              tObj['name'] = `${theTask.content}: (${theTask.addDate})`;
              return tObj;
            }), 
            name: "tasks", 
            message: "What tasks did you do?"
          }
        ])
        .then(answers => {
          answers['tasks'].forEach(answer => {
            tasks.find(x => x.id === answer).didit = true;
          });
          tasktools.saveTasks(tasks);
          
        })
      }
    })
  // console.log(JSON.stringify(dotasks))
}
