/**
 * Created by xingbozhang on 2017/10/30.
 */
var Layer = require('./layer')
var Route = require('./route')
var http = require('http')
class Router {
  constructor () {
    this.stack = []
  }

  /**
   *
   * @param path
   * @returns {Route}
   */
  route (path) {
    var route = new Route(path)

    var layer = new Layer(path, route.dispatch.bind(route))

    layer.route = route

    this.stack.push(layer)

    return route
  }

  /**
   *
   * @param req
   * @param res
   * @returns {*}
   */
  handle (req, res, done) {

    var self = this,
      method = req.method,
      idx = 0, stack = self.stack

    function next (err) {
      var layerError = (err === 'route' ? null : err)

      //跳过路由系统
      if (layerError === 'router') {
        return done(null)
      }

      if (idx >= stack.length || layerError) {
        return done(layerError)
      }

      var layer = stack[idx++]
      //匹配，执行
      if (layer.match(req.url)) {
        return layer.handle_request(req, res, next)
      } else {
        next(layerError)
      }
    }

    next()
  }
}

http.METHODS.forEach(function (method) {
  method = method.toLowerCase()
  Router.prototype[method] = function (path, fn) {
    var route = this.route(path)
    route[method].call(route, fn)

    return this
  }
})

exports = module.exports = Router