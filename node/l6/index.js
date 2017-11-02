var express = require('express')
var hash = require('pbkdf2-password')
var path = require('path')
var session = require('express-session')

var app = express()

app.set('view engine', 'ejs')
app.set('view', path.join(__dirnames, 'views'))

app.use(express.urlencoded({extended: false}))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'shhh,very secret'
}))

app.use(function (req, res, next) {
  var err = req.session.error
  var msg = req.session.success
  delete req.session.error
  delete req.session.success

  res.locals.message = ''
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>'
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>'

  next()
})

var users = {
  tj: {name: 'tj'}
}

hash({password: 'foobar'}, function (err, pass, salt, hash) {
  if (err) throw err
  users.tj.salt = salt
  users.tj.hash = hash
})

function authenticate (name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass)
  var user = users[name]

  if (!user) return fn(new Error('cannot find user'))

  hash({password: pass, salt: user.salt}, function (err, pass, salt, hash) {
    if (err) return fn(err)
    if (hash === user.hash) return fn(null, user)
    fn(new Error('invalid password'))
  })
}

function restrict (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.session.error = 'Access denied'
    res.redirect('/login')
  }
}

app.get('/', function (req, res) {
  res.redirect('/login')
})

app.get('/restricted', restrict, function (req, res) {
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>')
})

app.get('/logout', function (req, res) {
  req.session.destroy()
})