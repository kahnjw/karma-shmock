(function(window) {
  window.__karma__.loaded = function() {};

  var socket = io.connect('http://' + location.host, {
    'reconnection delay': 500,
    'reconnection limit': 2000,
    'sync disconnect on unload': true,
    'max reconnection attempts': Infinity
  });

  var mock = {};

  socket.on('connect_error', console.error);
  socket.on('reconnect_error', console.error);

  socket.on('connect', function() {
    window.mock = mock;
    window.__karma__.start(window.__karma__.config);
  });

  function MockOptions(method, url) {
    this.url = url;
    this.method = method;
  }

  MockOptions.prototype.set = function() {
    return this;
  };

  MockOptions.prototype.reply = function(status, data) {
    var eventName = this.method + 'Setup';
    var data = {
      url: this.url,
      status: status,
      data: data
    };

    return {
      notify: function(func) {
        socket.emit(eventName, data, func);
      }
    };
  };

  mock.get = function(url) {
    return new MockOptions('get', url);
  };

  mock.put = function(url) {
    return new MockOptions('put', url);
  };

  mock.post = function(url) {
    return new MockOptions('post', url);
  };

  mock.delete = function(url) {
    return new MockOptions('delete', url);
  };

})(window);
