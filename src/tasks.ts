import { rejects } from "assert";

const fa = require("./fileaccess");
const uuid = require('uuid-random');
const {DateTime} = require("luxon");

export const getTasks = () => {
  return new Promise((resolve, reject) => {
      fa.getDo()
        .then(tasks => {
            resolve(tasks)
        })
  });
};

export const saveTasks =(tasks) => {
    return new Promise((resolve, reject) => {
        fa.writeDo(tasks)
            .then(resolve('written file'))
            .catch(err => reject(err))
    });
};

export const addTaskToToday = (newtask, today) => {
  const weekdaydiff = [0, 2, 0, 0, 0, 0, 1, 2];
  const day = DateTime.local().weekday;
  return new Promise((resolve, reject) => {
      const dateadded = today ? DateTime.local().minus({days: weekdaydiff[day]}).toISODate() : DateTime.local().minus({days: weekdaydiff[day] + 1}).toISODate();
      // const dateadded = taskdate.weekday >= 6 ?  

      // let dateadded = today ? DateTime.local().toISODate() : DateTime.local().minus({days: 1}).toISODate();
      const didit = today ? false : true;
      fa.getDo()
        .then( (tasks) => {

            tasks.push({'content': newtask, 'addDate': dateadded, 'didit': didit, 'id': uuid()})
            console.log(`Added: ${newtask}`);
            fa.writeDo(tasks);
            resolve("successfully added task")
        })
        .catch(err => {
            reject(err)
        })
  });
};
