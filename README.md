# nextable

[![Build Status](https://travis-ci.org/addhome2001/nextable.svg?branch=master)](https://travis-ci.org/addhome2001/nextable)

[![Known Vulnerabilities](https://snyk.io/test/github/addhome2001/nextable/badge.svg)](https://snyk.io/test/github/addhome2001/nextable)

Computing any kinds of functions in serial order.

## Install
```
npm install nextable
```

## Usage
___Require nextable___

```js
const nextable = require('nextable');
```

___Functions of async and sync___
```js

// if not passing "next" to the arguments,
// will be treated like a normal function.
const normalTask = () => {
  console.log('normal task');
};

// if passing "next" to the arguments,
// will wait for "next" to be called
const setTimeoutTask = next => {
  setTimeout(() => {
    console.log('setTimeout Task');
    next();
  }, 1000);
};

const promiseTask = next =>
  new Promise(resolve => {
    console.log('promise Task');
    next();
    resolve();
  });

```

___Passing any kind of functions:___

```js
nextable(
  setTimeoutTask,
  promiseTask,
  normalTask
);

// will logs
// -> setTimeout Task
// -> promise Task
// -> normal Task
```

## Test

```
npm test
```


LICENSE
=======

MIT
