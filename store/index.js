export const state = () => ({
  tab: '',
  offsetTop: 0,
  scrolling: false,
  contactOnly: false
})
export const mutations = {
  setTab (state, tab) {
    state.tab = tab
    if (tab === 1)state.contactOnly = false
    if (tab === 3)state.contactOnly = true
    if ([0, 1].includes(tab)) {
      console.log('FROM INDEX')
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
