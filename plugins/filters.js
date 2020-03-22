import Vue from 'vue'

Vue.filter('formatDate', str => {
  if (!str) {
    return "(n/a)";
  }
  str = new Date(+str);
  return (
    str.getFullYear() +
    "-" +
    (str.getMonth() < 9 ? "0" : "") +
    (str.getMonth() + 1) +
    "-" +
    (str.getDate() < 10 ? "0" : "") +
    str.getDate()
  );
})
Vue.filter('truncate', (text, stop, clamp) => {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
});

