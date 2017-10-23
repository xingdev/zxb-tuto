var Layer = function (path, fn) {
  this.path = path
  this.handle = fn
  this.name = fn.name || '<anonymous>'
}

Layer.prototype.match = function (path) {
  return path === this.path
}

Layer.prototype.handle_request = function (req, res, next) {
  var fn = this.handle
  try {
    fn(req, res, next)
  } catch (err) {
    next(err)
  }
}

module.exports = Layer