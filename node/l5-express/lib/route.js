var Layer = require('./layer')

var Route = function (path) {
  this.path = path
  this.stack = []
  this.methods = {}
}

Route.prototype._handles_method = function (method) {
  var name = method.toLowerCase()
  console.log(this.methods[name])
  return Boolean(this.methods[name])
}

Route.prototype.get = function (fn) {
  var layer = new Layer('/', fn)
  layer.method = 'get'

  this.methods['get'] = true

  this.stack.push(layer)

  return this
}

Route.prototype.dispatch = function (req, res) {
  var method = req.method.toLowerCase()

  this.stack.forEach(function (layer) {
    if (method === layer.method) {
      return layer.handle_request(req, res)
    }
  })
}

module.exports = Route