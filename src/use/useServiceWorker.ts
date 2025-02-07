import { i18n } from '@/i18n'
import { Dialog } from '@varlet/ui'
import { useRegisterSW } from 'virtual:pwa-register/vue'

export function useServiceWorker() {
  // 检查周期
  const UPDATE_CHECK_PERIOD = 60 * 60 * 1000
  const swActivated = ref(false)

  function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
    if (UPDATE_CHECK_PERIOD < 0) return

    const checkUpdate = async () => {
      try {
        if ('onLine' in navigator && !navigator.onLine) {
          console.warn('离线状态，跳过更新检查')
          return
        }

        const resp = await fetch(swUrl, {
          cache: 'no-cache',
          headers: {
            cache: 'no-store',
            'cache-control': 'no-cache',
          },
        })

        if (resp.status === 200) {
          console.info('有更新，开始更新')
          await r.update()
          console.info('更新完成')
        } else {
          console.info('无更新')
        }
      } catch (error) {
        console.error('更新失败', error)
      }
    }

    const checkInterval = window.setInterval(checkUpdate, UPDATE_CHECK_PERIOD)

    return () => {
      if (checkInterval) {
        window.clearInterval(checkInterval)
      }
    }
  }

  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    // 有新版本需要更新时的回调
    onNeedRefresh() {
      // 有更新时弹出更新提示（暂时先关闭）
      if (process.env.NODE_ENV !== 'production') return

      Dialog({
        title: i18n.global.t('update_available'),
        message: i18n.global.t('update_ready'),
        onConfirm: async () => {
          await updateServiceWorker()
        },
      })
    },
    // PWA 准备好离线使用时的回调
    onOfflineReady() {},
    // Service Worker 注册成功的回调
    onRegisteredSW(swUrl, r) {
      if (UPDATE_CHECK_PERIOD < 0) return

      console.info('sw注册成功')

      // 如果激活状态，则开始检查更新
      if (r?.active?.state === 'activated') {
        swActivated.value = true
        registerPeriodicSync(swUrl, r)
      } else if (r?.installing) {
        // 安装状态，则监听状态变化，激活后开始检查更新
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          swActivated.value = sw.state === 'activated'
          if (swActivated.value) {
            registerPeriodicSync(swUrl, r)
          }
        })
      }
      setInterval(async () => {}, 60 * 60 * 1000)
    },
    // Service Worker 注册失败的回调
    onRegisterError(error) {
      console.error('SW registration error', error)
    },
  })

  return {
    offlineReady,
    needRefresh,
    updateServiceWorker,
  }
}
