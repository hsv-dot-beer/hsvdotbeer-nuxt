<template>
  <div ref="root" class="sort" :class="{ open: sortOpen }">
    <button
      type="button"
      class="sort-button btn btn-outline-light"
      aria-label="Sort List of Beers"
      aria-haspopup="true"
      :aria-expanded="sortOpen ? 'true' : 'false'"
      @click="sortOpen = !sortOpen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459" width="16" height="16" fill="currentColor">
        <path d="M178.5,382.5h102v-51h-102V382.5z M0,76.5v51h459v-51H0z M76.5,255h306v-51h-306V255z" />
      </svg>
    </button>
    <div class="sort-options" @keydown.escape="closeSort">
      <div class="sort-options-header">
        Sort by:
      </div>
      <ul>
        <li v-for="s in sort" :key="s.name">
          <button
            type="button"
            class="sort-option"
            :class="{selected: s.name === selectedSort.name }"
            @click="onSortChange(s)"
          >
            {{ s.name }}
            <span v-if="s.name === selectedSort.name" class="sort-direction" aria-hidden="true">{{ invertSort ? '▼' : '▲' }}</span>
            <span v-if="s.name === selectedSort.name" class="visually-hidden">{{ invertSort ? ', descending' : ', ascending' }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  initialOrdering: {
    type: String,
    default: 'name'
  }
})
const emit = defineEmits(['updated'])

const sort = [
  { name: 'Name', sort: 'name' },
  { name: 'Brewery', sort: 'manufacturer' },
  { name: 'Style', sort: 'style' },
  { name: 'ABV', sort: 'abv' }
]
const orderingFieldMap = { name: 'name', manufacturer: 'manufacturer__name', style: 'style__name', abv: 'abv' }

function parseOrdering (ordering) {
  const invert = ordering.startsWith('-')
  const field = invert ? ordering.slice(1) : ordering
  const match = sort.find(s => orderingFieldMap[s.sort] === field)
  return { selected: match || sort[0], invert }
}

const initial = parseOrdering(props.initialOrdering)
const invertSort = ref(initial.invert)
const selectedSort = ref(initial.selected)
const sortOpen = ref(false)
const root = ref(null)

function closeSort () {
  sortOpen.value = false
}

function onDocumentClick (event) {
  if (sortOpen.value && root.value && !root.value.contains(event.target)) {
    closeSort()
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))

function getOrdering () {
  let ordering = ''
  const sortKey = selectedSort.value.sort

  if (sortKey === 'name') {
    ordering = 'name'
  } else if (sortKey === 'manufacturer') {
    ordering = 'manufacturer__name'
  } else if (sortKey === 'style') {
    ordering = 'style__name'
  } else if (sortKey === 'abv') {
    ordering = 'abv'
  } else {
    ordering = 'name'
  }

  if (invertSort.value) {
    ordering = `-${ordering}`
  }
  return ordering
}

function onSortChange (newSort) {
  if (selectedSort.value.sort === newSort.sort) {
    invertSort.value = !invertSort.value
  } else {
    selectedSort.value = newSort
    invertSort.value = false
  }
  emit('updated', getOrdering())
  closeSort()
}
</script>

<style scoped>
.sort {
  flex:0 1 auto;
  padding-left:1rem;
  position:relative;
}
.sort-button {
  padding:.75rem;
  color: var(--color-text);
}
.sort-options {
  display:none;
  position:absolute;
  right:0;
  top:2.75rem;
  width:8rem;
  background:var(--bg-hover);
  z-index:1000;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.sort.open .sort-options {
  display:block;
}
.sort-options-header {
  padding:1rem 1rem .5rem;
  font-weight:700;
}
.sort-options ul {
  list-style:none;
  padding-left:0;
  margin-bottom:0;
}
.sort-options ul li .sort-option {
  display:block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  padding: .5rem 1rem;
  color: var(--color-link);
}
.sort-options ul li .sort-option.selected {
  border-left:.5rem solid #febf01;
}
.sort-direction {
  float: right;
  font-size: 0.75rem;
}
.sort-options ul li .sort-option:hover {
  background:var(--overlay-hover);
  text-decoration:none;
}
</style>
