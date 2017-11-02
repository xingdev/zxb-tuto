/**
 * Created by xingbozhang on 2017/10/19.
 */
var Application = require('./application')

function createApplication () {
  return new Application()
}

var Router = require('./router')

exports = module.exports = createApplication

exports.Router = Router