/**
 * Created by xingbozhang on 2017/10/17.
 */

var http = require('http')

http.createServer(function (request, response) {
  response.writeHead(200, {'content-Type': 'text/plain'})

  response.end('hello World\n')
}).listen(8888)

console.log('Server running at http://127.0.0.1:8888/')