import { localStorage } from '@/utils/storage'
import { darkTheme } from '@/styles/dark'
import { lightTheme } from '@/styles/light'
import { STORAGE_PREFIX } from '@/constant/common'
import { useGlobalStore } from '@/store'

export function useDark() {
  const { isDark: _isDark } = storeToRefs(useGlobalStore())

  const saved = localStorage.get(`${STORAGE_PREFIX}is_dark`)
  const isDark = ref(
    saved || (saved == null && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  function updateTheme() {
    localStorage.set(`${STORAGE_PREFIX}is_dark`, isDark.value)
    StyleProvider(isDark.value ? darkTheme : lightTheme)
    document.documentElement.style.setProperty('color-scheme', isDark.value ? 'dark' : 'light')
    notify()
  }

  function toggleDark() {
    isDark.value = !isDark.value
    updateTheme()
  }

  function notify() {
    if (window.parent === window) {
      return
    }

    window.parent.postMessage({ type: 'mobile-theme-change', isDark: isDark.value }, '*')
  }

  updateTheme()

  watchEffect(() => {
    _isDark.value = isDark.value
  })

  return {
    isDark,
    toggleDark,
    updateTheme,
  }
}
