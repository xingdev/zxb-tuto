var eventproxy = require('eventproxy')
var superagent = require('superagent')
var cheerio = require('cheerio')
var url = require('url')
var cnodeUrl = 'https://www.douban.com/'

superagent.get(cnodeUrl).end(function (err, res) {
  if (err) {
    return console.log(err)
  }

  var topicUrls = []
  var $ = cheerio.load(res.text)
  $('.notes a').each(function (idx, el) {
    var $element = $(el)
    var href = url.resolve(cnodeUrl, $element.attr('href'))
    topicUrls.push(href)
  })

  var ep = new eventproxy()

  ep.after('topic_html', topicUrls.length, function (topics) {
    topics = topics.map(function (topicPair) {
      var topicUrl = topicPair[0]
      var topicHtml = topicPair[1]
      var $ = cheerio.load(topicHtml)
      return ({
        title: $('h1').text().trim(),
        author: $('.note-author').text().trim(),
        url: topicUrl
      })
    })
    console.log('final:')
    console.log(topics)
  })

  topicUrls.forEach(function (topicUrl) {
    superagent.get(topicUrl)
      .end(function (err, res) {
        ep.emit('topic_html', [topicUrl, res.text])
      })
  })
})