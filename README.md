karma-shmock
============

[Shmock](https://github.com/xetorthio/shmock) for [Karma](http://karma-runner.github.io/).

Install it

```
$ npm install karma-shmock --save-dev
```

Use it:

```javascript
// karma.conf.js

module.exports = function(config) {
  var configuration = {
    frameworks: ['mocha', 'shmock'],
    browsers: ['Chrome'],
    shmock: {
      port: 9475
    },
    urlRoot: '/karma/',
    proxies: {
      '/': 'http://localhost:9475/',
    }
  };

  config.set(configuration);
};

```

```javascript
// specfile.js

before(function(done) {
  mock
  .get('/some-url')
  .reply(200)
  .notify(done);
});

...

```
