var Layer = function (path, fn) {
  this.path = path
  this.handle = fn
  this.name = fn.name || '<anonymous>'
}

Layer.prototype.match = function (path) {
  return path === this.path
}

Layer.prototype.handle_request = function (req, res) {
  var fn = this.handle
  if (fn) {
    return fn(req, res)
  }
}

module.exports = Layer