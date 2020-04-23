export const state = () => ({
  projects: [],
  project: {},
  showFilters: false
})

export const mutations = {
  setProject(state, data) {
    state.project = data
  },
  setProjects(state, data) {
    state.projects = data
  },
  setShowFilters(state, data) {
    state.showFilters = data
  },
}
