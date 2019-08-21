export const state = () => ({
  list: [],
  count: 0
})

export const mutations = {
  set(state, beers) {
    console.log('set')
    state.list = beers.results
    state.count = beers.count
  }
}

export const actions = {
  async get({ commit }) {
    await this.$axios.get('beers/').then((res) => {
      if (res.status === 200) {
        commit('set', res.data)
      }
    })
  },
  async getVenueBeers({ commit }, venueId) {
    console.log('getVenueBeers', venueId)
    await this.$axios.get('/venues/' + venueId + '/beers/').then((res) => {
      if (res.status === 200) {
        commit('set', res.data)
      }
    })
  },
  async set({ commit }, beer) {
    await commit('set', beer)
  }
}
