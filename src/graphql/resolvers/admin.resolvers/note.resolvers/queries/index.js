const { prefix } = require("../config.js");
const {
  formatters: { Prefixer },
} = require("../../../../../utilities/index.js");

Prefixer.setPrefix(prefix);

module.exports = {
  [Prefixer.addPrefix("GetAll")]: require("./getAll.js"),
};
