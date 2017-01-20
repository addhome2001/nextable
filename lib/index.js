function Nextable(fns) {
  var self = this;

  // The tasks queue.
  this.tasks = [];

  fns.forEach(this.pushSchedule.bind(self));

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

module.exports = Nextable;
