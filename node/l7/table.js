var stacks = []
function get (path, fn) {
  stacks.push({
    method: 'get',
    path,
    fn
  })
}

function post (path, fn) {
  stacks.push({
    method: 'post',
    path,
    fn
  })
}

function listen (url) {

}

get('/path1', function () {
  console.log('get + /path1')
})

get('/path2', function () {
  console.log('get + /path2')
})

post('/path2', function () {
  console.log('post + /path2')
})

