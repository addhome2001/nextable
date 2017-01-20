var Nextable = require('./index');
var utils = require('./utils');

function NextableFactory() {
  var fns = utils.toArray(arguments);
  return new Nextable(fns);
}

module.exports = NextableFactory;
