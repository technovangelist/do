"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const config = require("./config").getConfig();
const checkFileExists = () => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(config.doFile)) {
            resolve(config.doFile);
        }
        else {
            fs.writeFileSync(config.doFile, JSON.stringify([]), err => {
                reject(err);
            });
            resolve(config.doFile);
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
        fs.writeFileSync(config.doFile, JSON.stringify(tasks), err => {
            reject(err);
        });
        resolve("tasks written");
    });
};
