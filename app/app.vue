<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const venues = useVenuesStore()
const ui = useUiStore()
const { data: venuesLoaded } = await useAsyncData('venues', () => venues.load().catch(() => false))
if (!venuesLoaded.value) {
  ui.setApiDown(true)
}
</script>
