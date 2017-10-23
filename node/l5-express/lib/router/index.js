var Layer = require('./layer')
var Route = require('./route')
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

Router.prototype.get = function (path, fn) {
  var route = this.route(path)
  route.get(fn)
  return this
}

Router.prototype.handle = function (req, res) {
  this.stack.forEach(function (v) {
    if (v.match(req.url)) {
      return v.handle_request(req, res)
    }
  })
  return this.stack[0].handle_request && this.stack[0].handle_request(req, res)
}

module.exports = Router