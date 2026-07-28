<template>
  <div class="container-fluid">
    <div class="container-list">
      <ul id="venue-list">
        <VenueItem v-for="venue in venuesStore.records" :key="venue.id" :venue="venue" />
      </ul>
    </div>
  </div>
</template>

<script setup>
const venuesStore = useVenuesStore()

useSeoMeta({
  title: 'Venues - HSV.beer',
  description: 'Browse taprooms serving draft beer in Huntsville, AL.',
  ogTitle: 'Venues - HSV.beer',
  ogDescription: 'Browse taprooms serving draft beer in Huntsville, AL.',
  twitterTitle: 'Venues - HSV.beer',
  twitterDescription: 'Browse taprooms serving draft beer in Huntsville, AL.'
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

.container-list {
  margin: 0 -1rem;
}

#venue-list {
  padding: 0;
  list-style: none;
}
</style>
