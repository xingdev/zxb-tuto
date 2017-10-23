/**
 * Created by xingbozhang on 2017/10/19.
 */
const express = require('..')
const app = express()

app.listen(3000)

app.get('/demo', function (req, res) {
  res.send('this is a test app')
})

app.post('/demo', function (req, res) {
  res.send('post is a test app')
})
