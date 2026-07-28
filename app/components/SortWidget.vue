<template>
  <div class="sort">
    <button type="button" class="sort-button btn btn-outline-light" />
    <div class="sort-options z-3">
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
const emit = defineEmits(['updated'])

const sort = [
  { name: 'Name', sort: 'name' },
  { name: 'Brewery', sort: 'manufacturer' },
  { name: 'Style', sort: 'style' },
  { name: 'ABV', sort: 'abv' }
]
const invertSort = ref(false)
const selectedSort = ref({ name: 'Name', sort: 'name' })

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
}
.sort-button:before {
  content: "";
  background-image: url("../assets/filter-results-button.svg");
  width: 1rem;
  height: 1rem;
  display:block;
  background-size:1rem;
}
.sort-options {
  display:none;
  position:absolute;
  right:0;
  top:2.75rem;
  width:8rem;
  background:#fffbee;
  z-index:1000;
}
.sort:hover .sort-options {
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
  color: #906500;
}
.sort-options ul li .sort-option.selected {
  border-left:.5rem solid #febf01;
}
.sort-direction {
  float: right;
  font-size: 0.75rem;
}
.sort-options ul li .sort-option:hover {
  background:rgba(0,0,0,0.1);
  text-decoration:none;
}
</style>
