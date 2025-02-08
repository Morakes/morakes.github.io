import { I18nOptions, createI18n } from 'vue-i18n'
import { localStorage } from '@/utils/storage'
import { Locale as VarLocale } from '@varlet/ui'
import enUS from './messages/en-US.json'
import zhCN from './messages/zh-CN.json'
import { DEFAULT_LOCALE } from '@/constant/common'

const sotrageLocale = localStorage.get('locale')

VarLocale.add('en-US', VarLocale.enUS)
VarLocale.use(sotrageLocale ?? DEFAULT_LOCALE)

export enum Locale {
  'zh-CN' = 'zh-CN',
  'en-US' = 'en-US',
}

const options: I18nOptions = {
  legacy: false,
  locale: sotrageLocale ?? DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
}

export const i18n = createI18n<false, typeof options>(options)
