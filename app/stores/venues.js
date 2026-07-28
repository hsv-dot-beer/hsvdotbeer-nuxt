const storeRecord = records => (newRecord) => {
  const existingRecord = records.find(r => r.id === newRecord.id)

  if (existingRecord) {
    Object.assign(existingRecord, newRecord)
  } else {
    records.push(newRecord)
  }
}

export const useVenuesStore = defineStore('venues', {
  state: () => ({
    records: [],
    count: 0
  }),
  getters: {
    bySlug: state => slug => state.records.find(r => r.slug === slug)
  },
  actions: {
    async load () {
      const data = await $fetch('/api/proxy/venues')
      data.results.forEach(storeRecord(this.records))
      this.count = data.count
      return true
    }
  }
})
