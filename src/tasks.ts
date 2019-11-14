import { rejects } from "assert";

const fa = require("./fileaccess");
const uuid = require('uuid-random');
 
// let dotasks = fa
//   .getDo()
//   .then(tasks => {
//     console.log(tasks);
//   })
//   .catch(err => {
//     console.log(err);
//   });

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

export const addTaskToToday = (newtask) => {
  return new Promise((resolve, reject) => {
      fa.getDo()
        .then( (tasks) => {
            tasks.push({'content': newtask, 'addDate': Date.now(), 'complete': false, 'id': uuid()})
            console.log(tasks)
            fa.writeDo(tasks);
            resolve("successfully added task")
        })
        .catch(err => {
            reject(err)
        })
  });
};
