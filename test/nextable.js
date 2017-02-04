import ava from 'ava';
import { spy } from 'sinon';
import nextable from '../';

const trigger = spy();

const normalTask = () => {
  trigger('after normal');
};

const setTimeoutTask = (next) => {
  setTimeout(() => {
    trigger('after setTimeout');
    next();
  }, 100);
};

const promiseTask = next => new Promise((resolve) => {
  trigger('after promise');
  next();
  resolve();
});

const middleVerify = t => () => {
  t.plan(4);
  t.is(trigger.callCount, 3);
  t.is(trigger.getCall(0).args[0], 'after setTimeout');
  t.is(trigger.getCall(1).args[0], 'after normal');
  t.is(trigger.getCall(2).args[0], 'after promise');
};

const finalVerify = t => () => {
  t.plan(8);
  t.is(trigger.callCount, 6);
  t.is(trigger.getCall(3).args[0], 'after promise');
  t.is(trigger.getCall(4).args[0], 'after normal');
  t.is(trigger.getCall(5).args[0], 'after setTimeout');
  t.end();
};

ava.cb('should order of execute correct', (t) => {
  nextable(
    setTimeoutTask,
    normalTask,
    promiseTask,
    middleVerify(t),
    promiseTask,
    normalTask,
    setTimeoutTask,
    finalVerify(t),
  );
});

ava.afterEach(() => {
  trigger.reset();
});
