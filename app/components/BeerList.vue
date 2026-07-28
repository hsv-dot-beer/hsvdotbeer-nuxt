<template>
  <div class="container-list">
    <ul id="beer-list">
      <BeerItem v-for="beer in beers" :key="beer.id" :beer="beer" />
    </ul>
  </div>
</template>

<script setup>
const beersStore = useBeersStore()
const { records: beers } = storeToRefs(beersStore)

function bottomVisible () {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight - 250
  return bottomOfPage || pageHeight < visible
}

function onScroll () {
  if (bottomVisible()) {
    beersStore.loadNextPage()
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
.container-list {
  margin: 0 -1rem;
}

#beer-list {
  padding: 0;
  list-style: none;
}
</style>
