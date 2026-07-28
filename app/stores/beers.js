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
    records: []
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
    storeResults (data) {
      this.status = STATUS_SUCCESS
      data.results.forEach(storeRecord(this.records))
      this.count = data.count
      this.links = { next: data.next, prev: data.previous }
    },
    async loadPage ({ options }) {
      this.status = STATUS_LOADING
      const config = useRuntimeConfig()
      try {
        const data = await $fetch(`beers/?${getOptionsQuery(options)}`, {
          baseURL: config.public.apiBase
        })
        this.resetState()
        this.storeResults(data)
        return true
      } catch (err) {
        this.status = STATUS_ERROR
        this.error = err
        throw err
      }
    },
    async loadNextPage () {
      if (!this.links.next || this.status === STATUS_LOADING) { return false }
      this.status = STATUS_LOADING
      try {
        const data = await $fetch(this.links.next)
        this.storeResults(data)
        return true
      } catch (err) {
        this.status = STATUS_ERROR
        this.error = err
        throw err
      }
    }
  }
})
