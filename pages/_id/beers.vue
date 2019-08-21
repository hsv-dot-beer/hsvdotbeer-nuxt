<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <p>Beers</p>
        <v-col v-for="beer in beers" :key="beer.id">
          <v-card>
            <v-card-title v-text="beer.name"></v-card-title>
            <v-card-text class="align-end"></v-card-text>
          </v-card>
        </v-col>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapState({
      count: (state) => state.beers.count,
      beers: (state) => state.beers.list
    })
  },
  async fetch({ store, params }) {
    await store.dispatch('beers/getVenueBeers', params.id)
  }
}
</script>
