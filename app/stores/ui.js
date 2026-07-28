export const useUiStore = defineStore('ui', {
  state: () => ({
    showModal: false,
    modalVenue: {},
    theme: null
  }),
  actions: {
    showVenueModal (venue) {
      this.modalVenue = venue
      this.showModal = true
    },
    hideVenueModal () {
      this.modalVenue = {}
      this.showModal = false
    },
    initTheme () {
      const stored = localStorage.getItem('theme')
      this.theme = stored === 'light' || stored === 'dark' ? stored : null
    },
    toggleTheme () {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const currentlyDark = this.theme ? this.theme === 'dark' : systemPrefersDark
      this.theme = currentlyDark ? 'light' : 'dark'
      localStorage.setItem('theme', this.theme)
      document.documentElement.setAttribute('data-theme', this.theme)
    }
  }
})
