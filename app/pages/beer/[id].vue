<template>
  <div class="container-fluid beer-permalink">
    <p class="back-link">
      <NuxtLink to="/">
        ← All beers
      </NuxtLink>
    </p>
    <div class="beer-permalink-header">
      <div class="beer-permalink-logo">
        <img :src="logo" :alt="logoAlt" loading="lazy" @error="onLogoError">
      </div>
      <div class="beer-permalink-info">
        <h1 class="beer-permalink-name">
          {{ beer.name }}
        </h1>
        <div class="beer-permalink-brewer">
          {{ beer.manufacturer.name }}
        </div>
        <div :style="styleCss" class="beer-style srm">
          {{ styleName }}
          <span v-if="abvFixed" class="beer-abv">{{ abvFixed }}%</span>
        </div>
        <div v-if="rating !== null && rating >= 0.1" class="beer-permalink-rating">
          Untappd rating: {{ rating }}
        </div>
      </div>
    </div>
    <BeerDetails :beer="beer" />
  </div>
</template>

<script setup>
const route = useRoute()
const beersStore = useBeersStore()
const id = computed(() => Number(route.params.id))
const logoLoadFailed = ref(false)

const { data: beer } = await useAsyncData(`beer-${id.value}`, () => beersStore.loadOne(id.value).catch(() => null))

if (!beer.value) {
  throw createError({ statusCode: 404, statusMessage: 'Beer not found', fatal: true })
}

const abvFixed = computed(() => beer.value.abv ? Number(beer.value.abv).toFixed(1) : undefined)
const logo = computed(() => beer.value.logo_url && !logoLoadFailed.value ? beer.value.logo_url : '/img/beernotfound.jpg')
const logoAlt = computed(() => beer.value.name + ' logo')
const styleCss = computed(() => beer.value.color_srm_html ? { '--background-color': beer.value.color_srm_html } : {})
const styleName = computed(() => beer.value.style ? beer.value.style.name : 'Unknown')

const rating = computed(() => {
  const rawRating = beer.value.untappd_metadata?.json_data?.rating_score
  return rawRating !== undefined ? Number(rawRating).toFixed(1) : undefined
})

function onLogoError () {
  logoLoadFailed.value = true
}

useHead({
  title: `${beer.value.name} - HSV.beer`,
  meta: [
    { name: 'description', content: `${beer.value.name} by ${beer.value.manufacturer.name} - find it on tap in Huntsville.` }
  ]
})
</script>

<style scoped>
.beer-permalink {
  padding-top: 1rem;
}

.back-link {
  margin-bottom: 1rem;
}

.beer-permalink-header {
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.beer-permalink-logo {
  overflow: hidden;
  flex: 0 0 5rem;
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
  border: 1px solid var(--border-color);
  background: var(--bg-subtle);
  display: flex;
}

.beer-permalink-logo img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.beer-permalink-info {
  flex: 1;
  min-width: 0;
}

.beer-permalink-name {
  margin-bottom: 0.25rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
}

.beer-permalink-brewer {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.beer-style {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.beer-style:before {
  content: ' ';
  background: var(--bg-subtle);
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  margin-right: 0.125rem;
  border-radius: 50%;
}

.beer-abv:before {
  content: ' - ';
}

.beer-permalink-rating {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.srm:before {
  background-color: var(--background-color);
}
</style>
