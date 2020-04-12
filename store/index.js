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
    console.log("fgergerge", data);

    state.showFilters = data
  },
}
