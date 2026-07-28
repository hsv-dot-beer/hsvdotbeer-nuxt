<template>
  <div class="beer-details">
    <div class="find-it">
      <h3 class="find-it-header">
        Find it on tap at:
      </h3>
      <ul class="find-it-list">
        <li v-for="place of beer.venues" :key="place.id">
          <button type="button" class="link-button" @click="openModal(place)">
            {{ place.name }}
          </button>
        </li>
      </ul>
    </div>
    <div v-if="hasUrl" class="learn-more">
      <h3 class="learn-more-header">
        Learn more
      </h3>
      <a
        v-if="beer.untappd_url"
        :href="beer.untappd_url"
        target="_blank"
        rel="noreferrer"
        class="btn btn-outline-primary btn-learn-more"
      >
        Untappd
      </a>
      <a
        v-if="beer.taphunter_url"
        :href="beer.taphunter_url"
        target="_blank"
        rel="noreferrer"
        class="btn btn-outline-primary btn-learn-more"
      >
        TapHunter
      </a>
      <a
        v-if="beer.rate_beer_url"
        :href="beer.rate_beer_url"
        target="_blank"
        rel="noreferrer"
        class="btn btn-outline-primary btn-learn-more"
      >
        RateBeer
      </a>
      <a
        v-if="beer.beer_advocate_url"
        :href="beer.beer_advocate_url"
        target="_blank"
        rel="noreferrer"
        class="btn btn-outline-primary btn-learn-more"
      >
        BeerAdvocate
      </a>
      <a
        v-if="stemAndSteinUrl"
        :href="stemAndSteinUrl"
        target="_blank"
        rel="noreferrer"
        class="btn btn-outline-primary btn-learn-more"
      >
        Stem and Stein
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  beer: {
    type: Object,
    required: true
  }
})

const ui = useUiStore()

const stemAndSteinUrl = computed(() => props.beer.stem_and_stein_pk
  ? 'https://thestemandstein.com/Home/BeerDetails/' + props.beer.stem_and_stein_pk
  : undefined)

const hasUrl = computed(() => !!(
  props.beer.untappd_url ||
  props.beer.taphunter_url ||
  stemAndSteinUrl.value ||
  props.beer.rate_beer_url ||
  props.beer.beer_advocate_url
))

function openModal (venue) {
  ui.showVenueModal(venue)
}
</script>

<style scoped>
.beer-details {
  display: flex;
  padding: 1rem;
}

.beer-details a,
.beer-details .link-button {
  position: relative;
  z-index: 10;
}
.find-it,
.learn-more {
  flex: 1 1 50%;
}
.find-it {
  padding-right: 0.5rem;
}

.find-it-list li a,
.find-it-list li {
  padding: 0.25rem 0;
}

.link-button {
  background: transparent;
  border: 0;
  padding: 0;
  color: var(--color-link);
  cursor: pointer;
}

.link-button:hover {
  color: var(--color-link-hover);
}

.learn-more {
  padding-left: 0.5rem;
}

.find-it-header,
.learn-more-header {
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.find-it-header {
  margin-bottom: 0;
}

.find-it-list {
  list-style-type: none;
  padding-left: 0;
}

.btn-learn-more {
  margin-bottom: 0.3125rem;
}
</style>
