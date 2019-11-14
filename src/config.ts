const Config = require("conf")
const conf = new Config("technovangelistdo")

export const getDoFile = () => {
  let doFile = conf.get("doFile");
  if (!doFile) {
    const homedir = require('os').homedir()
    conf.set('doFile', `${homedir}/dofile.json`)
  }
  return conf.get("doFile");
}
