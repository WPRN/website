import Vue from 'vue'

Vue.filter('formatDate', (str) => {
  if (!str) {
    return '(n/a)'
  }
  str = new Date(+str)
  return (
    str.getFullYear() +
    '-' +
    (str.getMonth() < 9 ? '0' : '') +
    (str.getMonth() + 1) +
    '-' +
    (str.getDate() < 10 ? '0' : '') +
    str.getDate()
  )
})
Vue.filter('truncate', (text, stop, link, url) => {
  return (
    text.slice(0, stop) +
    (stop < text.length
      ? url
        ? '... <a href="' + url + '">' + link + '</a>'
        : '...'
      : '')
  )
})

Vue.filter('nl2br', (str) => {
  var breakTag = '<br>'
  return (str + '').replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + breakTag + '$2'
  )
})
Vue.filter('highlight', function (word, query) {
  console.log('word', word)
  console.log('query', query)
  var check = new RegExp(typeof query === 'string' ? query : query.join('|'), 'ig')
  return word.replace(check, function (matchedText, a, b) {
    return (
      '<strong style="color: darkslategray;background-color: yellow;">' +
        matchedText +
        '</strong>'
    )
  })
})
