const state = {
  areaQuery: {}
}

const getters = {
  areaQuery: state => { return state.areaQuery }
}

const mutations = {
  setAreaQuery (state, payload) {
    state.areaQuery = payload
  }
}

export default {
  state,
  getters,
  mutations
}