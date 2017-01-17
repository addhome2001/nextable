var utils = require('./utils');

function Nextable(fns) {
  var self = this;

  // The tasks queue.
  this.tasks = [];

  fns.forEach(function (fn) {
    self.pushSchedule(fn);
  });

  // execute first task after all tasks pushed to the this.tasks
  setTimeout(function () {
    self.next();
  }, 0);
}

Nextable.prototype.taskFactory = function (fn) {
  var next = this.next.bind(this);
  return function () {
    // check whether augument is empty，or next
    if (fn.length >= 1) {
      fn(next);
    } else {
      fn();
      next();
    }
  };
};

Nextable.prototype.pushSchedule = function (fn) {
  var task = this.taskFactory(fn);
  this.tasks = this.tasks.concat(task);
};

Nextable.prototype.next = function () {
  var task = this.tasks.shift();
  task && task();
};

function NextableFactory() {
  const fns = utils.toArray(arguments);
  return new Nextable(fns);
}

module.exports = NextableFactory;
