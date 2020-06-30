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
  try {
    // remove stop words

    query = query.filter(item => !stopWords.includes(item) && item.length > 2)

    if (query.length) {
      if (word.length > 400) {
        // calculate matches indexes
        const indexes = []
        query.forEach((element, index) => {
          if (word.indexOf(element)) indexes.push(word.indexOf(element))
        })

        // is there a match?
        if (indexes.length) {
          const firstIndex = Math.min(...indexes)

          // is it in the first 400 chars?
          if (firstIndex - query.reduce(function (a, b) { return a.length > b.length ? a : b }).length > 400) {
            // check if the first index is at the end of the string, if so, we split from the end
            if (word.length - firstIndex < 400) {
              word = '...' + word.substring(word.length - 400, word.length)
            } else {
              // if not, we shift the string to its start
              word = '...' + word.substring(firstIndex - 5, 395 + firstIndex)
            }
          } else {
            word = word.slice(0, 400)
          }
        } else { // no match, let's just truncate
          word = word.slice(0, 400)
        }

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
      }
    }
    word = word + '... <a href="' + url + '">' + link + '</a>'

    return word
  } catch (error) {

  }
})
Vue.filter('highlight', function (word, query) {
  if (typeof query === 'string' && !stopWords.includes(query) && query.length > 2) {
    var check = new RegExp(query, 'ig')
    return word.replace(check, function (matchedText, a, b) {
      return (
        '<strong style="color: darkslategray;background-color: yellow;">' +
        matchedText +
        '</strong>'
      )
    })
  } else {
    query = query.filter(item => !stopWords.includes(item) && item.length > 2)
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
