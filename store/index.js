export const state = () => ({
  tab: '',
  offsetTop: 0
})
export const mutations = {
  setTab (state, tab) {
    state.tab = tab
  },
  setOffsetTop (state, offset) {
    state.offsetTop = offset
  }
}
