var mysql = require('mysql')

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
})

con.connect(function () {
  console.log('Connected!')
  var sql = 'SELECT * FROM customers'
  con.query(sql, function (err, result, fields) {
    if (err) throw err
    console.log(result)
  })
})