var http = require('http')
var Router = require('./router/index')
var router = new Router()

exports = module.exports = {
  get: function (path, handle) {
    router.get(path, handle)
  },
  listen: function (port, cb) {
    var self = this

    var server = http.createServer(function (req, res) {
      if (!res.send) {
        res.send = function (body) {
          res.writeHead(200, {'Content-Type': 'text/plain'})
          res.end(body)
        }
      }

      router.handle(req, res)
    })

    //代理
    return server.listen.apply(server, arguments)
  }
}