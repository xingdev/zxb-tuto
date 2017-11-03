function fn1 (next) {
  console.log('fn1')
  next()
}

function fn2 () {
  console.log('fn2')
}

var stacks = []

stacks.push(fn1)

stacks.push(fn2)

function handle (done) {
  var i = 0

  var next = function (err) {
    if (err) {
      return done()
    }

    if (i > stacks.length) {
      return done()
    }

    var fn = stacks[i++]

    return fn && fn(next)
  }

  next()
}
var done = function () {
  console.log('is finish')
}

handle(done)
