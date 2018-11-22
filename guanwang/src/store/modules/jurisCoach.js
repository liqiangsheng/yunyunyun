const state = {
  jurisCoach: []
}

const getters = {
  jurisCoach: state => { return state.jurisCoach }
}

const mutations = {
  setjurisCoach (state, payload) {
    state.jurisCoach = payload
  }
}

export default {
  state,
  getters,
  mutations
}
