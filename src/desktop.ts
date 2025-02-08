import App from './Desktop.vue'
import { inMobile } from 'rattail'

import { setupPinia } from './store'

import '@/styles/common.css'
import 'virtual:uno.css'
import 'virtual-icons'

if (inMobile()) {
  window.location.replace('./index.html')
}

const app = createApp(App)

setupPinia(app)

app.mount('#app')
