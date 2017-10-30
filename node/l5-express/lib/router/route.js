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
class Route {
  constructor (path) {
    this.path = path
    this.stack = []
    this.methods = {}
  }

  _handles_method (method) {
    method = method.toLowerCase()
    return Boolean(this.methods[method])
  }

  get (fn) {
    var layer = new Layer('/', fn)
    layer.method = 'get'
    this.methods['get'] = true
    this.stack.push(layer)
    return this
  }

  dispatch (req, res) {
    var method = req.method.toLowerCase()
    this.stack.forEach(layer => {
      if (method === layer.method) {
        return layer.handle_request(req, res)
      }
    })
  }
}

exports = module.exports = Route