class Layer {
  constructor (path, handle) {
    this.path = path
    this.handle = handle
  }

  /**
   *
   * @param req
   * @param res
   */
  handle_request (req, res) {
    var fn = this.handle
    if (fn) {
      fn(req, res)
    }
  }

  /**
   *
   * @param path
   * @returns {boolean}
   */
  match (path) {
    return path === this.path
  }
}

exports = module.exports = Layer