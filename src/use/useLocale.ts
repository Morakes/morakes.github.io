import { i18n } from '@/i18n'
import { Locale as VarLocale } from '@varlet/ui'
import { customLocalStorage } from '@/utils/storage'

export enum Locale {
  'zh-CN' = 'zh-CN',
  'en-US' = 'en-US',
}
export const useLocale = () => {
  const { $t: t } = getCurrentInstance()!.appContext.app.config.globalProperties

  const locale = computed(() => i18n.global.locale.value as Locale)
  function getLocale() {
    return i18n.global.locale.value as Locale
  }
  function setLocale(locale: Locale) {
    customLocalStorage.set('locale', locale)
    i18n.global.locale.value = locale
    VarLocale.use(locale)
  }

  return { getLocale, setLocale, locale, t }
}
