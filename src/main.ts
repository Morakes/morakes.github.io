import App from './App.vue'
import router from '@/router'
import dayjs from 'dayjs'
import { i18n } from '@/i18n'
import { createApp } from 'vue'
import { createBounceFixer } from '@varlet/bounce-fixer'
import { inMobile } from 'rattail'

import { setupAppHeight } from './utils/elements'
import { setupFpjsPlugin } from './plugin/fpjs-plugin'
import { setupPinia } from './store'

import '@/styles/common.css'
import '@varlet/touch-emulator'
// snackbar组件样式 用于函数调用时样式不丢失
import '@varlet/ui/es/snackbar/snackbar.css'
import '@varlet/ui/es/dialog/dialog.css'
import 'virtual:uno.css'
import 'virtual-icons'

if (!inMobile() && window === window.parent) {
  // window.location.replace('./desktop.html')
}
setupAppHeight()

createBounceFixer().enable()

const app = createApp(App)

app.config.globalProperties.$dayjs = dayjs

setupPinia(app)
setupFpjsPlugin(app)

app.use(router).use(i18n).mount('#app')
