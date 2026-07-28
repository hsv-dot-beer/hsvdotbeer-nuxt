export const useUiStore = defineStore('ui', {
  state: () => ({
    showModal: false,
    modalVenue: {}
  }),
  actions: {
    showVenueModal (venue) {
      this.modalVenue = venue
      this.showModal = true
    },
    hideVenueModal () {
      this.modalVenue = {}
      this.showModal = false
    }
  }
})
