<template>
  <div class="container-list">
    <ul id="beer-list">
      <BeerItem v-for="beer in beers" :key="beer.id" :beer="beer" />
    </ul>
    <div v-if="beersStore.isLoading" class="beer-list-spinner" role="status">
      <span class="visually-hidden">Loading more beers…</span>
    </div>
    <button
      v-show="showScrollTop"
      type="button"
      class="scroll-top-button"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      ↑
    </button>
  </div>
</template>

<script setup>
const beersStore = useBeersStore()
const { records: beers } = storeToRefs(beersStore)
const showScrollTop = ref(false)

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
  showScrollTop.value = window.scrollY > 600
}

function scrollToTop () {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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

.beer-list-spinner {
  width: 2rem;
  height: 2rem;
  margin: 1rem auto;
  border: 0.25rem solid #e5e5e5;
  border-top-color: #906500;
  border-radius: 50%;
  animation: beer-list-spin 0.75s linear infinite;
}

@keyframes beer-list-spin {
  to {
    transform: rotate(360deg);
  }
}

.scroll-top-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0;
  background: #f5bd00;
  color: #31302c;
  font-size: 1.5rem;
  line-height: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 20;
}

.scroll-top-button:hover {
  background: #ffd34f;
}
</style>
