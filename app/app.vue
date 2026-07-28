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

const config = useRuntimeConfig()
const route = useRoute()
const defaultDescription = 'Find draft beer in Huntsville, Alabama.'
const defaultImage = `${config.public.siteUrl}/icon.png`

useSeoMeta({
  ogSiteName: 'HSV.beer',
  ogType: 'website',
  ogTitle: 'HSV.beer',
  ogDescription: defaultDescription,
  ogImage: defaultImage,
  ogUrl: () => `${config.public.siteUrl}${route.path}`,
  twitterCard: 'summary',
  twitterTitle: 'HSV.beer',
  twitterDescription: defaultDescription,
  twitterImage: defaultImage
})
</script>
