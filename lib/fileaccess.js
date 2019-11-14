"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const config = require("./config");
const checkFileExists = () => {
    return new Promise((resolve, reject) => {
        const doFile = config.getDoFile();
        if (fs.existsSync(doFile)) {
            resolve(doFile);
        }
        else {
            fs.writeFileSync(doFile, JSON.stringify([]), err => {
                reject(err);
            });
            resolve(doFile);
        }
    });
};
exports.getDo = () => {
    return new Promise((resolve, reject) => {
        checkFileExists()
            .then(dofile => {
            let dotasks = JSON.parse(fs.readFileSync(dofile, 'utf8'));
            resolve(dotasks);
        })
            .catch(err => {
            reject(err);
        });
    });
};
exports.writeDo = (tasks) => {
    return new Promise((resolve, reject) => {
        fs.writeFileSync(config.getDoFile(), JSON.stringify(tasks), err => {
            reject(err);
        });
        resolve("tasks written");
    });
};
