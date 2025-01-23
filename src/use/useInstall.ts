import { useTemplateRef, onMounted, onBeforeMount, ref } from 'vue'

export function useInstall() {
  const installButtonRef = useTemplateRef<HTMLButtonElement>('installButtonRef')
  const installButtonShow = ref(false)
  let deferredPrompt: any | null = null

  function getPWADisplayMode() {
    if (document.referrer.startsWith('android-app://')) return 'twa'
    if (window.matchMedia('(display-mode: browser)').matches) return 'browser'
    if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone'
    if (window.matchMedia('(display-mode: minimal-ui)').matches) return 'minimal-ui'
    if (window.matchMedia('(display-mode: fullscreen)').matches) return 'fullscreen'
    if (window.matchMedia('(display-mode: window-controls-overlay)').matches)
      return 'window-controls-overlay'

    return 'unknown'
  }
  /**
   * DOMContentLoaded 事件
   * @param _evt
   */
  const DOMContentLoadedHandler = (_evt: Event) => {
    if ('BeforeInstallPromptEvent' in window) {
      console.log('✅ Support BeforeInstallPromptEvent')
    } else {
      console.warn('❌UnSupport BeforeInstallPromptEvent')
    }
  }

  /**
   * beforeinstallprompt 事件
   * @param evt
   */
  const beforeInstallPromptHandler = (evt: any) => {
    evt.preventDefault()

    // 保存该事件，因为稍后需要触发它。
    deferredPrompt = evt
    console.log('✅ beforeinstallprompt event fired')

    if (installButtonRef.value) {
      installButtonShow.value = true
    }
  }

  /**
   * 安装后，可以移除 事件监听器
   */
  const appInstalledHandler = () => {
    // 隐藏按钮
    if (installButtonRef.value) {
      installButtonShow.value = false
    }
    // 重置 deferredPrompt 以便下一次使用。
    deferredPrompt = null
    console.log('🆗 App Installed')

    // 安装后，可以移除 事件监听器
    removeEventListener()
  }

  /**
   * 添加事件监听器
   */
  const addEventListener = () => {
    window.addEventListener('DOMContentLoaded', DOMContentLoadedHandler)
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)
    window.addEventListener('appinstalled', appInstalledHandler)
  }

  /**
   * 移除事件监听器
   */
  const removeEventListener = () => {
    window.removeEventListener('DOMContentLoaded', DOMContentLoadedHandler)
    window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler)

    if (typeof appInstalledHandler === 'function') {
      window.removeEventListener('appinstalled', appInstalledHandler)
    }
  }

  onMounted(() => {
    addEventListener()
  })

  onBeforeMount(() => {
    removeEventListener()
  })

  const install = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      // 等待用户选择是否安装
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        installButtonShow.value = false
        deferredPrompt = null
      })
    }
  }

  return {
    installButtonRef,
    installButtonShow,
    install,
    getPWADisplayMode,
  }
}
