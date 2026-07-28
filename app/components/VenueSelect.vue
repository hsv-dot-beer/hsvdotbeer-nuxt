<template>
  <div class="taphouse-select-container">
    <select id="taphouseSelect" class="chosen-select" aria-label="Select a taproom" @change="onChange($event)">
      <option value="">
        Select a taproom
      </option>
      <option v-for="option in venuesStore.records" :key="option.slug" :value="option.slug">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const venuesStore = useVenuesStore()
const router = useRouter()

function onChange (event) {
  if (event.target.value) {
    router.push('/' + event.target.value)
  }
}
</script>

<style>
.taphouse-select-container {
  flex:1 1 100%;
}

select#taphouseSelect:focus, select#taphouseSelect:active {
  outline:0;
  background: #ffdf7e;
}

/* Select Box */
.taphouse-select-container {
  position: relative;
  margin-bottom: 1rem;
  z-index:10;
  max-width:520px;
  margin-left:auto;
  margin-right:auto;
}

select#taphouseSelect {
  font-size: 1.25rem;
  font-weight: 400;
  line-height:1.25;
  width:100%;
  padding: .75rem 2rem .75rem 3rem;
  border: 0;
  background-color: #ffd34f;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline:0;
  z-index:1;
  border-radius:.5rem;
  color:#31302c;
  height:auto;
  overflow:hidden;
  white-space:nowrap;
}

select#taphouseSelect {
  font-size:1rem;
  line-height:1.25;
}

.taphouse-select-container:after {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 3rem;
  height: 100%;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/69546/down-arrow.svg);
  background-size: 1.25rem 1.25rem;
  background-position: 50% 50%;
  background-repeat:no-repeat;
  transition: transform 0.2s ease-out;
  opacity:0.6;
  content:" ";
  pointer-events: none;
}

.taphouse-select-container:before {
  content:" ";
  display:block;
  position:absolute;
  width:3rem;
  height:3rem;
  top:0;
  left:0;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/69546/placeholder.svg);
  background-size: 1.5rem 1.5rem;
  background-position: 50% 50%;
  background-repeat:no-repeat;
  opacity:0.6;
  pointer-events: none;
}

@media (min-width: 375px) {
  select#taphouseSelect {
    font-size:1.25rem;
  }
}

@media (min-width: 420px) {
  html {
    font-size:16px;
  }
  .container-fluid {
    padding-left:1rem;
    padding-right:1rem;
  }
}

@media (min-width: 576px) {
  .container-fluid {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width:880px) {
  .navbar-logo {
    padding-top:1.25rem;
  }

  .text-intro {
    padding-bottom:1.25rem;
  }

  .taphouse-select-container {
    flex:0 0 50%;
    padding-left:.5rem;
  }

  .taphouse-select-container:before {
    background-position: 90% 50%;
  }
}
</style>
