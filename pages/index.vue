<template>
  <div class="container-fluid">
    <div class="results-header">
      <h2 class="results-number">
        <span class="beer-total">{{ beerCount }}</span>
        <span class="d-none">matching</span> beers on tap
      </h2>
      <sort-widget @updated="updateBeers($event)" />
    </div>
    <beer-list />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BeerList from '~/components/BeerList'
import SortWidget from '~/components/SortWidget'

export default {
  components: {
    BeerList,
    SortWidget
  },
  computed: {
    ...mapState({
      beerCount: state => state.beers.count
    })
  },
  async fetch ({ store }) {
    await store.dispatch('beers/loadPage', {
      options: { on_tap: true, o: 'name' }
    })
  },
  methods: {
    updateBeers ({ sort, invert }) {
      let ordering = ''

      if (sort === 'name') {
        ordering = 'name'
      } else if (sort === 'brewer') {
        ordering = 'manufacturer__name'
      } else if (sort === 'style') {
        ordering = 'style__name'
      } else if (sort === 'abv') {
        ordering = 'abv'
      } else {
        // Default to name
        ordering = 'name'
      }

      if (invert) {
        ordering = `-${ordering}`
      }

      this.$store.dispatch('beers/loadPage', {
        options: { on_tap: true, o: ordering }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('HIDE_MODAL')
    next()
  }
}
</script>

<style>
.container-results-header {
  border-bottom: 1px solid #ddd;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  padding: 0.5rem 0;
}

.results-number {
  font-size: 1rem;
  margin: 0;
}

.beer-total {
  font-weight: 700;
}
</style>
