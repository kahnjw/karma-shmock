var path = require('path');
var shmock = require('shmock');

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initShmock = function(files, shmockConfig, webServer) {
  var shmockServer = shmock(shmockConfig.port);
  var io = require('socket.io').listen(webServer);

  var socketClientPath = path.dirname(require.resolve('socket.io-client'));

  files.unshift(createPattern(__dirname + '/karma-shmock-adapter.js'));
  files.unshift(createPattern(socketClientPath + '/socket.io.js'));

  io.on('connect', function(socket) {

    socket.on('getSetup', function(data, callback) {
      shmockServer
      .get(data.url)
      .reply(data.status, data.data);

      callback();
    });

    socket.on('postSetup', function(data, callback) {
      shmockServer
      .post(data.url)
      .reply(data.status, data.data);

      callback();
    });

    socket.on('putSetup', function(data, callback) {
      shmockServer
      .put(data.url)
      .reply(data.status, data.data);

      callback();
    });

    socket.on('deleteSetup', function(data, callback) {
      shmockServer
      .delete(data.url)
      .reply(data.status, data.data);

      callback();
    });
  });
};

initShmock.$inject = ['config.files', 'config.shmock', 'webServer'];

module.exports = {
  'framework:shmock': ['factory', initShmock]
};
