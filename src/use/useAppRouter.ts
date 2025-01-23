import { useRoute, useRouter } from 'vue-router'

export function useAppRouter() {
  const route = useRoute()
  const router = useRouter()
  /**
   * @description 前往当前路由的子级路由
   * @param path
   * @param query
   */
  function pushStack(path: string, query: Record<string, any> = {}) {
    const startsWithSlash = path.startsWith('/')
    const currentPathEndsWithSlash = route.path.endsWith('/')

    router.push({
      path: `${currentPathEndsWithSlash ? route.path.slice(0, -1) : route.path}${
        startsWithSlash ? path : `/${path}`
      }`,
      query: {
        ...route.query,
        ...query,
      },
    })
  }

  /**
   * @description 前往当前路由的父级路由
   */
  function pushParentRoute(query: Record<string, any> = {}) {
    const parentRoutePath = router.currentRoute.value.path.split('/').slice(0, -1).join('/')
    router.push({
      path: parentRoutePath,
      query: {
        ...route.query,
        ...query,
      },
    })
  }

  function getPreviousRouteParams() {
    return previousRouteParams.value
  }

  return {
    route,
    router,
    pushStack,
    pushParentRoute,
    getPreviousRouteParams,
  }
}
