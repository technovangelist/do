"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigStore = require("configstore");
const pkg = require("../package.json");
const conf = new ConfigStore(pkg.name);
module.exports = {
    getDoFile: () => {
        return conf.get("DoFile");
    },
    setDoFile: (filename = "/Users/matt.williams/dofile.json") => {
        conf.set("DoFile", filename);
    },
    getConfig: () => {
        let config = {
            "doFile": "/Users/matt.williams/dofile.json"
        };
        return config;
    }
};
