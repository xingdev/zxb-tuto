class Layer {
  constructor (path, handle) {
    this.path = path
    this.handle = handle
  }

  handle_request (req, res) {
    var fn = this.handle
    if (fn) {
      fn(req, res)
    }
  }

  match (path) {
    return path === this.path
  }
}

exports = module.exports = Layer