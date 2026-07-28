const STATUS_INITIAL = 'INITIAL'
const STATUS_LOADING = 'LOADING'
const STATUS_ERROR = 'ERROR'
const STATUS_SUCCESS = 'SUCCESS'

const storeRecord = records => (newRecord) => {
  const existingRecord = records.find(r => r.id === newRecord.id)

  if (existingRecord) {
    Object.assign(existingRecord, newRecord)
  } else {
    records.push(newRecord)
  }
}

const getOptionsQuery = (optionsObject = {}) =>
  Object.keys(optionsObject)
    .filter(k => typeof optionsObject[k] !== 'undefined')
    .map(k => `${k}=${encodeURIComponent(optionsObject[k])}`)
    .join('&')

export const useBeersStore = defineStore('beers', {
  state: () => ({
    error: null,
    status: STATUS_INITIAL,
    links: {},
    count: 0,
    records: [],
    search: '',
    ordering: 'name',
    venueSlug: null
  }),
  getters: {
    isLoading: state => state.status === STATUS_LOADING,
    isError: state => state.status === STATUS_ERROR,
    hasPrevious: state => !!state.links.prev,
    hasNext: state => !!state.links.next,
    all: state => state.records,
    byId: state => id => state.records.find(r => r.id === id)
  },
  actions: {
    resetState () {
      this.error = null
      this.status = STATUS_INITIAL
      this.links = {}
      this.count = 0
      this.records = []
    },
    setVenueSlug (slug) {
      this.venueSlug = slug || null
    },
    buildOptions () {
      return {
        on_tap: true,
        o: this.ordering,
        search: this.search || undefined,
        taps__venue__slug: this.venueSlug || undefined
      }
    },
    applyFilters () {
      return this.loadPage({ options: this.buildOptions() })
    },
    setSearch (value) {
      this.search = value
      return this.applyFilters()
    },
    setOrdering (value) {
      this.ordering = value
      return this.applyFilters()
    },
    async fetchSuggestions (query) {
      if (!query) { return [] }
      const options = {
        on_tap: true,
        search: query,
        taps__venue__slug: this.venueSlug || undefined
      }
      const data = await $fetch(`/api/proxy/beers?${getOptionsQuery(options)}`)
      return [...new Set(data.results.map(b => b.name))].slice(0, 8)
    },
    storeResults (data) {
      this.status = STATUS_SUCCESS
      data.results.forEach(storeRecord(this.records))
      this.count = data.count
      this.links = { next: data.next, prev: data.previous }
    },
    async loadPage ({ options }) {
      this.status = STATUS_LOADING
      try {
        const data = await $fetch(`/api/proxy/beers?${getOptionsQuery(options)}`)
        this.resetState()
        this.storeResults(data)
        return true
      } catch (err) {
        this.status = STATUS_ERROR
        this.error = err?.message || String(err)
        throw err
      }
    },
    async loadNextPage () {
      if (!this.links.next || this.status === STATUS_LOADING) { return false }
      this.status = STATUS_LOADING
      try {
        const nextUrl = new URL(this.links.next)
        const data = await $fetch(`/api/proxy/beers${nextUrl.search}`)
        this.storeResults(data)
        return true
      } catch (err) {
        this.status = STATUS_ERROR
        this.error = err?.message || String(err)
        throw err
      }
    },
    async loadOne (id) {
      const beer = await $fetch(`/api/proxy/beers/${id}`)
      storeRecord(this.records)(beer)
      return beer
    }
  }
})
