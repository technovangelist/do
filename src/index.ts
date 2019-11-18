#!/usr/bin/env node
const inquirer = require("inquirer");
const argv = require("minimist")(process.argv.slice(2));
const tasktools = require("./tasks");
const {DateTime} = require("luxon"); 
const clipboardy = require("clipboardy"); 
tasktools.getTasks(); 
if (argv["s"]) {
  console.log(" this will show stats at some point"); 
} else if (argv["r"]) {
  tasktools.getTasks()  
    .then(tasks => {
      const weekdaydiff = [3, 1, 1, 1, 1, 1, 2];

      console.log(weekdaydiff[DateTime.local().weekday -1])   
      
      let doneYesterday = tasks.filter(theTask => {
        
        let yesterday = DateTime.local().minus({days: weekdaydiff[DateTime.local().weekday - 1]}).toISODate();
        return theTask.addDate === yesterday && theTask.didit === true
      });
      console.log(doneYesterday);
      let doingToday = tasks.filter(theTask => {
        let today = DateTime.local().toISODate();
        return theTask.addDate === today;
      });
      let output = `1) ${doneYesterday.map(item => item.content).join(", ")}\n2) ${doingToday.map(item => item.content).join(", ")}\n3) `;
      console.log(output);
      output; 
      clipboardy.write(output); 
      output 
    })
} else if (argv["a"]) {
  console.log("this will show everything at some point. not sure what everything means");
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
}
