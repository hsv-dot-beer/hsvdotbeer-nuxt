<template>
  <li :class="{ active: visible }" class="beer">
    <div class="beer-intro">
      <div class="beer-logo">
        <img :src="logo" :alt="logoAlt" aria-hidden="true" loading="lazy" @error="onLogoError">
      </div>
      <div class="beer-info">
        <button type="button" class="beer-link" @click="toggle">
          <h2 class="beer-name">
            <span v-if="isNew" class="beer-new-badge">New</span>
            {{ beer.name }}
          </h2>
        </button>
        <div class="beer-brewer">
          {{ beer.manufacturer.name }}
        </div>
        <div :style="styleCss" class="beer-style srm">
          {{ styleName }}
          <span v-if="abvFixed" class="beer-abv">{{ abvFixed }}%</span>
        </div>
        <a
          v-if="rating !== null && rating >= 0.1 && beer.untappd_url"
          :href="beer.untappd_url"
          target="_blank"
          rel="noreferrer"
          class="beer-rating"
          :title="ratingLabel"
        >
          {{ rating }}
        </a>
        <div
          v-else-if="rating !== null && rating >= 0.1"
          class="beer-rating"
          :title="ratingLabel"
        >
          {{ rating }}
        </div>
      </div>
    </div>
    <div class="beer-details-container" :class="{ open: visible }">
      <div class="beer-details-inner">
        <BeerDetails :beer="beer" />
        <div class="beer-permalink">
          <NuxtLink :to="`/beer/${beer.id}`" class="beer-permalink-link">
            Permalink
          </NuxtLink>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  beer: {
    type: Object,
    default: () => ({})
  }
})

const visible = ref(false)
const logoLoadFailed = ref(false)

const abvFixed = computed(() => props.beer.abv ? Number(props.beer.abv).toFixed(1) : undefined)
const logo = computed(() => props.beer.logo_url && !logoLoadFailed.value ? props.beer.logo_url : '/img/beernotfound.jpg')
const logoAlt = computed(() => props.beer.name + ' logo')

function onLogoError () {
  logoLoadFailed.value = true
}
const styleCss = computed(() => props.beer.color_srm_html ? { '--background-color': props.beer.color_srm_html } : {})
const styleName = computed(() => props.beer.style ? props.beer.style.name : 'Unknown')

const isNew = computed(() => {
  if (!props.beer.time_first_seen) { return false }
  const daysSince = (Date.now() - new Date(props.beer.time_first_seen).getTime()) / (1000 * 60 * 60 * 24)
  return daysSince >= 0 && daysSince <= 14
})

const rating = computed(() => {
  const rawRating = props.beer.untappd_metadata?.json_data?.rating_score
  return rawRating !== undefined ? Number(rawRating).toFixed(1) : undefined
})

const ratingLabel = computed(() => {
  if (rating.value === undefined) { return undefined }
  const count = props.beer.untappd_metadata?.json_data?.rating_count
  return count ? `${rating.value} on Untappd from ${count.toLocaleString()} ratings` : `${rating.value} on Untappd`
})

function toggle () {
  visible.value = !visible.value
}
</script>

<style scoped>
.beer {
  position: relative;
  transition: all 0.1s ease-out;
}

.beer.active {
  background: var(--bg-hover);
  box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.2), 0 2px 8px 4px rgba(60, 64, 67, 0.1);
  z-index: 10;
  padding: 0.5rem 0 1rem;
}

.beer:hover,
.beer:focus-within {
  background: var(--bg-hover);
  box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.2), 0 2px 8px 4px rgba(60, 64, 67, 0.1);
}

.beer.active:hover,
.beer.active:focus-within {
  box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.2), 0 2px 8px 4px rgba(60, 64, 67, 0.1);
}

.beer-intro {
  position: relative;
  display: flex;
  padding: 1.25rem 0 0 1rem;
}

body .beer-link,
body .beer-link:hover {
  color: var(--color-text);
  text-decoration: none;
  cursor: pointer;
}

.beer-link {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  padding: 0;
}

.beer-link:focus {
  outline: none;
}

.beer-link::after {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
}

.beer-info {
  flex: 1;
  min-width: 0;
  padding-bottom: 1rem;
  padding-right: 0.5rem;
  margin-top: -0.125rem;
  box-shadow: 0 1px 0 var(--border-color);
  transition: box-shadow 0s 0s ease-out;
}

.beer.active .beer-info,
.beer:hover .beer-info {
  box-shadow: none;
  transition: box-shadow 0s ease-out;
}

li.beer:last-of-type .beer-info {
  box-shadow: none;
}

.beer-logo {
  overflow: hidden;
  float: left;
  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  margin-bottom: 1.25rem;
  margin-right: 1rem;
  transition: all 0.1s ease-out;
  border: 1px solid var(--border-color);
  background: var(--bg-subtle);
  display: flex;
}
.beer-logo img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.beer-name,
.beer-brewer,
.beer-style {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.beer-name {
  margin-bottom: 0rem;
  margin-top: -0.075rem;
  padding-right: 32px;
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3;
}

.beer-new-badge {
  display: inline-block;
  vertical-align: 0.15em;
  margin-right: 0.35rem;
  padding: 0.05rem 0.35rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  border-radius: 999px;
  background: var(--color-link);
  color: var(--bg-main);
}

.beer-brewer {
  line-height: 125%;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.beer-style {
  font-size: 0.85rem;
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

.beer.active .beer-name,
.beer.active .beer-brewer,
.beer.active .beer-style {
  overflow: visible;
  white-space: normal;
}

.beer-rating {
  position: absolute;
  z-index: 10;
  display: block;
  top: 0.875rem;
  right: 0.5rem;
  padding: 0.075rem;
  background: url(../assets/certificate.svg) no-repeat 50% 50%;
  background-size: 2rem;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 1.6rem;
  letter-spacing: -0.125rem;
  transition: background 0.1s ease-out;
  font-family: 'Lekton', courier, monospace;
  font-size: 1rem;
  padding-right: 0.25rem;
  padding-top: 0.325rem;
  color: #704e00;
}

a.beer-rating:hover {
  color: var(--color-link-hover);
  text-decoration: none;
}

.beer-details-container {
  position: relative;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.15s ease-out;
}

.beer-details-container.open {
  grid-template-rows: 1fr;
}

.beer-details-inner {
  overflow: hidden;
}

.beer-permalink {
  padding: 0 1rem 1rem;
}

.beer-permalink-link {
  position: relative;
  z-index: 10;
  font-size: 0.75rem;
  color: var(--color-link);
}

.beer-permalink-link:hover {
  color: var(--color-link-hover);
}

.srm:before {
  background-color: var(--background-color);
}
</style>
