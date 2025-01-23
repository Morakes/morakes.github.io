import { Router, createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { registryRouterChannel } from './channel'
import { useLoginStore } from '@/store/login'
import { useFpjsStore } from '@/store/fpjs'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/pages/home',
    },
    ...routes,
  ],
})

const { notify } = registryRouterChannel(router)

router.beforeEach(async (to) => {
  const { login, getToken } = useLoginStore()

  const fpjsStore = useFpjsStore()
  // 获取设备指纹
  if (!fpjsStore.deviceId) {
    await fpjsStore.getDeviceData()
  }
  // 获取游客token
  if (!getToken()) {
    await login(fpjsStore.deviceId)
  }

  notify(to.fullPath)
})

export default router
