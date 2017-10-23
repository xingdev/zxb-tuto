var Layer = require('./layer')
var Route = require('./route')
const http = require('http')

var Router = function () {
  this.stack = [
    new Layer('*', function (req, res) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('404')
    })
  ]
}

Router.prototype.route = function (path) {
  var route = new Route(path)

  var layer = new Layer(path, function (req, res) {
    route.dispatch(req, res)
  })

  layer.route = route

  this.stack.push(layer)

  return route
}

http.METHODS.forEach(function(method) {
  method = method.toLowerCase();
  Router.prototype[method] = function(path, fn) {
    var route = this.route(path);
    route[method].call(route, fn);

    return this;
  };
});

Router.prototype.handle = function (req, res) {
  this.stack.forEach(function (v) {
    if (v.match(req.url)) {
      return v.handle_request(req, res)
    }
  })
  return this.stack[0].handle_request && this.stack[0].handle_request(req, res)
}

module.exports = Router