<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <p>Beers</p>
        <p>Found {{ count }} beers</p>
        <v-col v-for="beer in beers" :key="beer.id">
          <v-card>
            <v-card-title v-text="beer.name"></v-card-title>
            <v-card-text class="align-end"></v-card-text>
          </v-card>
        </v-col>
        <div v-if="next">
          <v-progress-circular indeterminate color="primary" class="bottom" />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      bottom: false
    }
  },
  computed: {
    ...mapState({
      next: (state) => state.beers.links.next,
      count: (state) => state.beers.count,
      beers: (state) => state.beers.records
    })
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.$store.dispatch('beers/loadNextPage')
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch('beers/loadPage', {
      options: { on_tap: true, o: 'name' }
    })
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }
  }
}
</script>
