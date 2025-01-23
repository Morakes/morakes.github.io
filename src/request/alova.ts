import { TOKEN_PREFIX } from '@/constant/common'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { useLoginStore } from '@/store/login'

export const alovaInstance = createAlova({
  // 请求适配器
  requestAdapter: adapterFetch(),
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 1000 * 60,
  // 全局共享请求
  shareRequest: false,
  statesHook: VueHook,
  beforeRequest: (method) => {
    method.config.headers['authorization'] = useLoginStore().getToken() || `${TOKEN_PREFIX}`
  },
  // 响应拦截
  responded: {
    onSuccess: async (response) => {
      const { reLogin } = useLoginStore()

      if (response.status === 401) {
        reLogin()
      }
      const json = await response.json()

      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.msg)
      }

      return json
    },
    onError: (err) => {
      console.log('onError', err.message)
    },
    onComplete: () => {},
  },
})
