var Layer = require('./layer')
var Route = require('./route')
const http = require('http')

var Router = function () {
  this.stack = []
}

Router.prototype.route = function (path) {
  var route = new Route(path)

  var layer = new Layer(path, route.dispatch.bind(route))

  layer.route = route

  this.stack.push(layer)

  return route
}

http.METHODS.forEach(function (method) {
  method = method.toLowerCase()
  Router.prototype[method] = function (path, fn) {
    var route = this.route(path)
    route[method].call(route, fn)
    return this
  }
})

Router.prototype.handle = function (req, res, done) {
  var method = req.method
  var idx = 0
  var stack = this.stack

  function next (err) {
    var layerError = err === 'router' ? null : err
    if (layerError === 'router') {
      return done(null)
    }

    if (idx >= stack.length || layerError) {
      console.log(layerError)
      return done(layerError)
    }

    var layer = stack[idx++]
    if (layer.match(req.url) && layer.route && layer.route._handles_method(method)) {
      console.log('aaaa')
      layer.handle_request(req, res, next)
    } else {
      next(layerError)
    }
  }

  next()
}

module.exports = Router