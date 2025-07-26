const { formatters: { Prefixer },} = require("../../../../../utilities/index");
const { prefix } = require("../config.js");

Prefixer.setPrefix(prefix);

module.exports = {
  [Prefixer.addPrefix("Create")]: require("./create"),
  [Prefixer.addPrefix("Update")]: require("./update"),
  [Prefixer.addPrefix("Delete")]: require("./delete"),

};
