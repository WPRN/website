export const state = () => ({
  tab: '',
  offsetTop: 0,
  scrolling: false
})
export const mutations = {
  setTab (state, tab) {
    state.tab = tab
  },
  setOffsetTop (state, offset) {
    state.offsetTop = offset
  },
  lockScrolling (state) {
    state.scrolling = true
  },
  unlockScrolling (state) {
    state.scrolling = false
  }
}
