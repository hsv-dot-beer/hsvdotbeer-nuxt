export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const query = getQuery(event)
  const config = useRuntimeConfig()

  return await $fetch(`${path}/`, {
    baseURL: config.public.apiBase,
    query
  })
})
