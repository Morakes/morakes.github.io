import { Router, createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useLoginStore } from '@/store/login'
import { useFpjsStore } from '@/store/fpjs'
import { useUserStore } from '@/store/user'
import { UserInfoType } from '@/apis/user-center'
import { setupDesktopChannel } from './desktopChannel'

const router: Router = createRouter({
  history: createWebHashHistory('/panda-tv'),
  routes: [
    {
      path: '/',
      redirect: '/pages/home',
    },
    ...routes,
  ],
})

router.beforeEach(async (to) => {
  const { login, getToken } = useLoginStore()
  const { getUserInfo, userInfo } = useUserStore()

  const fpjsStore = useFpjsStore()
  // 获取设备指纹
  if (!fpjsStore.deviceId) {
    await fpjsStore.getDeviceData()
  }

  // 将设备指纹作为uid
  window.__bl?.setConfig?.({
    uid: fpjsStore.deviceId,
  })

  // 获取游客token
  if (!getToken()) {
    await login(fpjsStore.deviceId)
  }

  // 获取用户信息
  if (!userInfo) {
    getUserInfo().then((data: UserInfoType) => {
      window.__bl?.setConfig?.({
        setUsername: () => data.userid,
      })
    })
  }
})

router.isReady().then(() => {
  setupDesktopChannel(router)
})

export default router
