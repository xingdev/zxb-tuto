var Layer = require('./layer')
var http = require('http')
var Route = function (path) {
  this.path = path
  this.stack = []
  this.methods = {}
}

Route.prototype._handles_method = function (method) {
  var name = method.toLowerCase()
  return Boolean(this.methods[name])
}

http.METHODS.forEach(function (method) {
  method = method.toLowerCase()
  Route.prototype[method] = function (fn) {
    var layer = new Layer('/', fn)
    layer.method = method

    this.methods[method] = true

    this.stack.push(layer)

    return this
  }
})

Route.prototype.dispatch = function (req, res, done) {
  var method = req.method.toLowerCase()
  var idx = 0
  var stack = this.stack

  function next (err) {
    if (err && err === 'route') {
      return done()
    }

    if (err && err === 'router') {
      return done(err)
    }
    if (idx >= stack.length) {
      return done(err)
    }
    var layer = stack [idx++]
    if (method !== layer.method) {
      return next(err)
    }
    if (err) {
      return done(err)
    } else {
      layer.handle_request(req, res, next)
    }

  }

  next()
}

module.exports = Route