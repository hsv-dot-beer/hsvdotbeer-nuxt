<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <p>Venues</p>
        <v-col v-for="venue in venues" :key="venue.slug">
          <v-card>
            <v-card-title v-text="venue.name"></v-card-title>
            <v-card-text class="align-end">
              {{ venue.address }}
              {{ venue.slug }}
            </v-card-text>
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
      venues: (state) => state.venues.list
    })
  },
  async fetch({ store }) {
    await store.dispatch('venues/get')
  }
}
</script>
