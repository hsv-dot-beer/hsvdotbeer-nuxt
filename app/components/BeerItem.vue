<template>
  <li :class="{ active: visible }" class="beer">
    <div class="beer-intro">
      <div class="beer-logo">
        <img :src="logo" :alt="logoAlt" aria-hidden="true" loading="lazy">
      </div>
      <div class="beer-info">
        <button type="button" class="beer-link" @click="toggle">
          <h2 class="beer-name">
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
        <div v-if="rating !== null && rating >= 0.1" class="beer-rating">
          {{ rating }}
        </div>
      </div>
    </div>
    <div class="beer-details-container" :class="{ open: visible }">
      <div class="beer-details-inner">
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

const ui = useUiStore()
const visible = ref(false)

const abvFixed = computed(() => props.beer.abv ? Number(props.beer.abv).toFixed(1) : undefined)
const logo = computed(() => props.beer.logo_url ? props.beer.logo_url : '/img/beernotfound.jpg')
const logoAlt = computed(() => props.beer.name + ' logo')
const styleCss = computed(() => props.beer.color_srm_html ? { '--background-color': props.beer.color_srm_html } : {})
const styleName = computed(() => props.beer.style ? props.beer.style.name : 'Unknown')

const rating = computed(() => {
  const rawRating = props.beer.untappd_metadata?.json_data?.rating_score
  return rawRating !== undefined ? Number(rawRating).toFixed(1) : undefined
})

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

function toggle () {
  visible.value = !visible.value
}

function openModal (venue) {
  ui.showVenueModal(venue)
}
</script>

<style scoped>
.beer {
  position: relative;
  transition: all 0.1s ease-out;
}

.beer.active {
  background: #fffbee;
  box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.2), 0 2px 8px 4px rgba(60, 64, 67, 0.1);
  z-index: 10;
  padding: 0.5rem 0 1rem;
}

.beer:hover,
.beer:focus-within {
  background: #fffbee;
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
  color: #31302c;
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
  box-shadow: 0 1px 0 #ddd;
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
  border: 1px solid #ddd;
  background: #e5e5e5;
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

.beer-brewer {
  line-height: 125%;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.beer-style {
  font-size: 0.85rem;
  color: #606060;
}

.beer-style:before {
  content: ' ';
  background: #e5e5e5;
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
  color: #906500;
  cursor: pointer;
}

.link-button:hover {
  color: #31302c;
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

.srm:before {
  background-color: var(--background-color);
}

.btn-learn-more {
  margin-bottom: 0.3125rem;
}
</style>
