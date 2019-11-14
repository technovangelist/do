"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fa = require("./fileaccess");
const uuid = require('uuid-random');
const { DateTime } = require("luxon");
// let dotasks = fa
//   .getDo()
//   .then(tasks => {
//     console.log(tasks);
//   })
//   .catch(err => {
//     console.log(err);
//   });
exports.getTasks = () => {
    return new Promise((resolve, reject) => {
        fa.getDo()
            .then(tasks => {
            resolve(tasks);
        });
    });
};
exports.saveTasks = (tasks) => {
    return new Promise((resolve, reject) => {
        fa.writeDo(tasks)
            .then(resolve('written file'))
            .catch(err => reject(err));
    });
};
exports.addTaskToToday = (newtask, today) => {
    return new Promise((resolve, reject) => {
        const dateadded = today ? DateTime.local().toISODate() : DateTime.local().minus({ days: 1 }).toISODate();
        console.log(dateadded);
        fa.getDo()
            .then((tasks) => {
            tasks.push({ 'content': newtask, 'addDate': dateadded, 'didit': false, 'id': uuid() });
            console.log(`Added: ${newtask}`);
            fa.writeDo(tasks);
            resolve("successfully added task");
        })
            .catch(err => {
            reject(err);
        });
    });
};
