(function(window) {
  var socket = io('http://localhost:3123');

  function MockOptions(method, url) {
    this.url = url;
    this.method = method;
  }

  MockOptions.prototype.set = function() {};

  MockOptions.prototype.reply = function(status, data) {
    var callbackId = Math.random();

    socket.emit(this.method + 'Setup', {
      url: this.url,
      status: status,
      data: data,
      callbackId: callbackId
    });

    return {
      notify: function(func) {
        socket.on(String(callbackId), func);
      }
    };
  };

  window.mock = {};

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
