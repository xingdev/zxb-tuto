/**
 * Created by xingbozhang on 2017/10/19.
 */
const express = require('..')
const app = express()

app.listen(3000)

//app.put('/', function (req, res) {
//  res.send('put Hello World!')
//})

app.get('/demo', function (req, res) {
  res.send('get Hello World!')
})

app.get('/demo2', function demo2 (req, res) {
  res.send('get Hello World!')
})
app.put('/demo2', function demo2 (req, res) {
  res.send('get Hello World!')
})

