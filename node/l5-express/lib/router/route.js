/**
 * Created by xingbozhang on 2017/10/30.
 */

/***
 Route = {
   path:'/'
   stacker:[
    Layer:{
    method: 'get',
    handle: function
    }
   ],
   methods:{
     get:true
  }
}
 ***/
var Layer = require('./layer')
var http = require('http')
/**
 *
 */
class Route {
  constructor (path) {
    this.path = path
    this.stack = []
    this.methods = {}
  }

  /**
   *
   * @param method
   * @returns {boolean}
   * @private
   */
  _handles_method (method) {
    method = method.toLowerCase()
    return Boolean(this.methods[method])
  }

  /**
   *
   * @param req
   * @param res
   */
  dispatch (req, res, done) {
    console.log(done)
    var self = this,
      method = req.method.toLowerCase(),
      idx = 0, stack = self.stack

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

      var layer = stack[idx++]
      if (method !== layer.method) {
        return next(err)
      }

      if (err) {
        //主动报错
        return done(err)
      } else {
        layer.handle_request(req, res, next)
      }

    }

    next()
  }

}

http
  .METHODS
  .forEach(
    function (method) {
      method = method.toLowerCase()
      Route.prototype[method] = function (fn) {
        var layer = new Layer('/', fn)
        layer.method = method

        this.methods[method] = true
        this.stack.push(layer)

        return this
      }
    }
  )

exports = module.exports = Route