import Vue from 'vue'
import stopWords from '~/assets/stopWords'

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
Vue.filter('highlightAndTruncate', function (word, query, url, link) {
  // remove stop words
  query = query.filter(item => !stopWords.includes(item))
  if (query.length) {
    console.log('word BEFORE truncate: ', word)

    console.log('query has length')
    if (word.length > 400) {
      console.log('word is more than 400 and query is: ', query)
      // calculate matches indexes
      let indexes = []
      query.forEach((element, index) => {
        if (word.indexOf(element)) indexes.push(word.indexOf(element))
      })
      let firstIndex = Math.min(...indexes)
      console.log('firstIndex: ', firstIndex)
      console.log('longuest qery item', query.reduce(function (a, b) { return a.length > b.length ? a : b }).length)
      // is it in the first 400 chars?
      console.log('condition', firstIndex - query.reduce(function (a, b) { return a.length > b.length ? a : b }).length)
      if (firstIndex - query.reduce(function (a, b) { return a.length > b.length ? a : b }).length > 400) {
      // check if the first index is at the end of the string, if so, we split from the end
        if (word.length - firstIndex < 400) {
          word = '...' + word.substring(word.length - 400, word.length)
          console.log('word from the end: ', word)
        } else {
        // if not, we shift the string to its start
          word = '...' + word.substring(Math.min(...indexes) - 5, 395)
          console.log('word from the first index: ', word)
        }
      } else {
        word = word.slice(0, stop)
      }
    }
    console.log('word after truncate: ', word)

    query.forEach((element) => {
      var check = new RegExp(element, 'ig')
      word = word.toString().replace(check, function (matchedText, a, b) {
        return (
          '<strong style="color: darkslategray;background-color: yellow;">' +
          matchedText
        )
      })
    })
  }
  if (word > 399) word = word + '... <a href="' + url + '">' + link + '</a>'
  console.log('word: ', word)
  return word
})
Vue.filter('highlight', function (word, query) {
  if (typeof query === 'string') {
    var check = new RegExp(query, 'ig')
    return word.replace(check, function (matchedText, a, b) {
      return (
        '<strong style="color: darkslategray;background-color: yellow;">' +
        matchedText +
        '</strong>'
      )
    })
  } else {
    query.forEach((element) => {
      var check = new RegExp(element, 'ig')
      word = word.toString().replace(check, function (matchedText, a, b) {
        return (
          '<strong style="color: darkslategray;background-color: yellow;">' +
          matchedText +
          '</strong>'
        )
      })
    })
    return word
  }
})
