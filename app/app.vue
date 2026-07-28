<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const venues = useVenuesStore()
await useAsyncData('venues', () => venues.load())
</script>
