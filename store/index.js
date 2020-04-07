export const state = () => ({
  projects: [],
  project: {},
})

export const mutations = {
  setProject(state, data) {
    state.project = data
  },
  setProjects(state, data) {
    state.projects = data
  },
}
