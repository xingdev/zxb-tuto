/**
 * Created by xingbozhang on 2017/10/30.
 */
var Layer = require('./layer')
var Route = require('./route')
class Router {
  constructor () {
    this.stack = [
      new Layer('*', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('404')
      })
    ]
  }

  /**
   *
   * @param path
   * @returns {Route}
   */
  route (path) {
    var route = new Route(path)

    var layer = new Layer(path, function (req, res) {
      route.dispatch(req, res)
    })

    layer.route = route

    this.stack.push(layer)

    return route
  }

  /**
   *
   * @param path
   * @param handle
   * @returns {Router}
   */
  get (path, handle) {
    var route = this.route(path)

    route.get(handle)

    return this
  }

  /**
   *
   * @param req
   * @param res
   * @returns {*}
   */
  handle (req, res) {
    this.stack.forEach(layer => {
      if (layer.match(req.url)) {
        return layer.handle_request(req, res)
      }
    })
    return this.stack[0].handle_request(req, res)
  }
}

exports = module.exports = Router