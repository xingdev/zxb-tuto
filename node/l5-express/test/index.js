/**
 * Created by xingbozhang on 2017/10/19.
 */
const express = require('..')
const app = express()

app.listen(3000)

app.get('/index', function (req, res) {
  res.send('this is a test app')
})