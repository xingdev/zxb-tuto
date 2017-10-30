/**
 * Created by xingbozhang on 2017/10/19.
 */
const express = require('..')
const app = express()

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/demo', function (req, res) {
  res.send('this is demo')
})

