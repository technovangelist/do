"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = require("conf");
const conf = new Config("technovangelistdo");
exports.getDoFile = () => {
    let doFile = conf.get("doFile");
    if (!doFile) {
        const homedir = require('os').homedir();
        conf.set('doFile', `${homedir}/dofile.json`);
    }
    return conf.get("doFile");
};
