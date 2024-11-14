import { Router, createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { registryRouterChannel } from './channel'

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/layout/home',
    },
    ...routes,
  ],
})

const { notify } = registryRouterChannel(router)

router.beforeEach((to) => {
  notify(to.fullPath)
})

export default router
