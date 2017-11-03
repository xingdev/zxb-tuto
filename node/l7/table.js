function get (path, fn) {
  if (path === '/1') {
    fn()
  }
}

function post (path, fn) {
  if (path === '/3') {
    fn()
  }
}

