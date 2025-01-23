import { fpjsPlugin } from '@fingerprintjs/fingerprintjs-pro-vue-v3'
import { App } from 'vue'

const fpjsApiKey = import.meta.env.VITE_FPJS_API_KEY
/**
 * 初始化浏览器设备指纹插件
 * @param app
 */
export const setupFpjsPlugin = async (app: App) => {
  return app.use(fpjsPlugin, {
    loadOptions: {
      apiKey: fpjsApiKey,
    },
  })
}
