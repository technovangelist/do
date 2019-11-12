import { monitorEventLoopDelay } from "perf_hooks";

const ConfigStore = require("configstore");
const pkg = require("../package.json");
const conf = new ConfigStore(pkg.name);

module.exports = {
  getDoFile: () => {
    return conf.get("DoFile");
  },

  setDoFile: (filename = "~/dofile.json") => {
    conf.set("DoFile", filename);
  }
};
