/**
 * Created by xingbozhang on 2017/10/19.
 */
const express = require('..')
const app = express()

app.listen(3000)

app.put('/', function (req, res) {
  res.send('put Hello World!')
})

app.get('/', function (req, res) {
  res.send('get Hello World!')
})

