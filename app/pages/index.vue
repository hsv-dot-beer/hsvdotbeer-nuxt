<template>
  <div class="container-fluid">
    <div class="results-header">
      <h2 class="results-number">
        <span class="beer-total">{{ beersStore.count }}</span>
        <span class="d-none">matching</span> beers on tap
      </h2>
      <SortWidget @updated="updateBeers($event)" />
    </div>
    <BeerList />
  </div>
</template>

<script setup>
const beersStore = useBeersStore()
const ui = useUiStore()

onBeforeRouteLeave((to, from, next) => {
  ui.hideVenueModal()
  next()
})

await useAsyncData('beers-index', () => beersStore.loadPage({
  options: { on_tap: true, o: 'name' }
}))

function updateBeers (ordering) {
  beersStore.loadPage({ options: { on_tap: true, o: ordering } })
}
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
</style>
