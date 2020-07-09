export const state = () => ({
  tab: '',
  offsetTop: 0,
  scrolling: false,
  contactOnly: false
})
export const mutations = {
  setTab (state, tab) {
    state.tab = tab
  },
  setContact (state, contact) {
    state.contact = contact
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
