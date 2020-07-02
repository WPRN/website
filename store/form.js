export const state = () => ({
  project: {
    name: '',
    type: '',
    description: '',
    field: '',
    state: '',
    thematics: '',
    url: '',
    date: '',
    dates: '',
    time: '',
    zone: '',
    continent: '',
    country: '',
    location: '',
    contact_firstname: '',
    contact_lastname: '',
    contact_email: '',
    contact_entity: '',
    feedback: ''
  }
})

export const mutations = {
  updateProject (state, args) {
    Object.keys(args).forEach((key) => {
      state.project[key] = args[key]
    })
  }
}
