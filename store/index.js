export const actions = {
  nuxtServerInit({ dispatch }, context) {
    dispatch('venues/load', context)
  }
}
