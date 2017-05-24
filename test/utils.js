import ava from 'ava';
import { toArray } from '../lib/utils';

const getArgs = function () {
  return toArray(arguments);
};

ava('toArray', (t) => {
  t.deepEqual(getArgs(1, 2, 3), [1, 2, 3]);
});

ava('empty array', (t) => {
  t.deepEqual(getArgs(), []);
});
