<template>
  <div class="container-fluid">
    <div class="results-header">
      <h2 class="results-number">
        <span class="beer-total">{{ beersStore.count }}</span>
        <span class="d-none">matching</span> beers on tap at
        <button v-if="venue" type="button" class="link-button" @click="openModal(venue)">
          {{ venue.name }}
        </button>
      </h2>
      <SortWidget :initial-ordering="beersStore.ordering" @updated="beersStore.setOrdering($event)" />
    </div>

    <BeerList />
  </div>
</template>

<script setup>
const route = useRoute()
const beersStore = useBeersStore()
const venuesStore = useVenuesStore()
const ui = useUiStore()

const slug = computed(() => route.params.slug)
const venue = computed(() => venuesStore.bySlug(slug.value))

if (!venue.value) {
  throw createError({ statusCode: 404, statusMessage: 'Venue not found', fatal: true })
}

beersStore.setVenueSlug(slug.value)

onBeforeRouteLeave((to, from, next) => {
  ui.hideVenueModal()
  next()
})

await useAsyncData(`beers-venue-${slug.value}`, () => beersStore.applyFilters().catch(() => false))

function openModal (v) {
  ui.showVenueModal(v)
}

const config = useRuntimeConfig()
const pageTitle = `${venue.value.name} - HSV.beer`
const pageDescription = `Beers on tap at ${venue.value.name} in Huntsville, AL.`
const pageImage = venue.value.logo_url || `${config.public.siteUrl}/icon.png`

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: pageImage,
  ogUrl: `${config.public.siteUrl}/${slug.value}`,
  twitterCard: venue.value.logo_url ? 'summary_large_image' : 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: pageImage
})
</script>

<style>
.container-results-header {
  border-bottom: 1px solid var(--border-color);
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

.link-button {
  background: transparent;
  border: 0;
  padding: 0;
  color: var(--color-link);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: inherit;
  font-size: inherit;
}

.link-button:hover {
  color: var(--color-link-hover);
}
</style>
