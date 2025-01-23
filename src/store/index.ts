import { createPinia } from 'pinia'
import { App } from 'vue'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { STORAGE_PREFIX } from '@/constant/common'

export * from './global'
export * from './login'
export * from './user'
export * from './search-history'
export * from './fpjs'

const pinia = createPinia()
export const setupPersisttedState = () => {
  pinia.use(
    createPersistedState({
      storage: localStorage,
      key: (id) => `${STORAGE_PREFIX}${id}`,
      serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      },
    })
  )
}
export const setupPinia = (app: App) => {
  setupPersisttedState()
  app.use(pinia)
}
