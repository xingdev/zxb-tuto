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

Route.prototype.dispatch = function (req, res) {
  var method = req.method.toLowerCase()

  this.stack.forEach(function (layer) {
    if (method === layer.method) {
      return layer.handle_request(req, res)
    }
  })
}

module.exports = Route