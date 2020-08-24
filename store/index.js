export const state = () => ({
  tab: '',
  offsetTop: 0,
  scrolling: false,
  contactOnly: false
})
export const mutations = {
  setTab (state, tab) {
    if (tab !== undefined) {
      state.tab = tab
      if (tab === 1)state.contactOnly = false
      if (tab === 3)state.contactOnly = true
    }
  },
  setContactOnly (state, val) {
    state.contactOnly = val
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
