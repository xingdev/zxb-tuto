/**
 * Created by xingbozhang on 2017/10/19.
 */
const http = require('http')
const Router = require('./router/index')

module.exports = {
  _router: new Router(),
  get: function (path, fn) {
    this._router.get(path, fn)
  },
  listen: function (port, cb) {
    var self = this
    var server = http.createServer(function (req, res) {
      if (!res.send) {
        res.send = function (body) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end(body)
        }
      }
      return self._router.handle(req, res)
    })

    return server.listen.apply(server, arguments)
  }
}