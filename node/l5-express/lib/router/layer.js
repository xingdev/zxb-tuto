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
  handle_request (req, res, next) {
    var fn = this.handle
    try {
      fn(req, res, next)
    } catch (err) {
      next(err)
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