var io = require('socket.io')();
var path = require('path');
var shmock = require('shmock');

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initShmock = function(files, shmockConfig, config) {
  var shmockServer = shmock(shmockConfig.port);

  var socketClientPath = path.dirname(require.resolve('socket.io-client'));

  files.unshift(createPattern(__dirname + '/karma-shmock-adapter.js'));
  files.unshift(createPattern(socketClientPath + '/socket.io.js'));

  io.on('connection', function(socket) {
    socket.on('getSetup', function(data) {
      shmockServer
      .get(data.url)
      .reply(data.status, data.data);

      socket
      .emit(String(data.callbackId));
    });

    socket.on('postSetup', function(data) {
      shmockServer
      .post(data.url)
      .reply(data.status, data.data);

      socket
      .emit(String(data.callbackId));
    });

    socket.on('putSetup', function(data) {
      shmockServer
      .put(data.url)
      .reply(data.status, data.data);

      socket
      .emit(String(data.callbackId));
    });

    socket.on('deleteSetup', function(data) {
      shmockServer
      .delete(data.url)
      .reply(data.status, data.data);

      socket
      .emit(String(data.callbackId));
    });

  });
  io.listen(3123);
};

initShmock.$inject = ['config.files', 'config.shmock', 'config'];

module.exports = {
  'framework:shmock': ['factory', initShmock]
};
