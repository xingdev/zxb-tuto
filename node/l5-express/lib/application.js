/**
 * Created by xingbozhang on 2017/10/19.
 */
const http = require('http')


var router = [
  {
    path: '*',
    method: '*',
    handle: function (req, res) {
      res.writeHead(200, {'content-Type': 'text/plain'})
      res.send('404')
    }
  },
]

function app () {
  return {
    get: function (path, fn) {
      router.push({
        path: path,
        method: 'GET',
        handle: fn
      })
    },
    listen: function (port, cb) {
      var server = http.createServer(function (req, res) {

        if (!res.send) {
          res.send = function (body) {
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            })
            res.end(body)
          }
        }

        for (var i = 1, len = router.length; i < len; i++) {
          if ((req.url === router[i].path || req.url === '*') &&
            (req.method === router[i].method || req.method === '*')) {
            return router[i].handle && router[i].handle(req, res)
          }
        }

        return router[0].handle && router[0].handle(req, res)
      })

      //可以保持express().listen和http.listen的参数统一。
      return server.listen.apply(server, arguments)
    }
  }
}

exports = module.exports = app