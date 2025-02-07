import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-vue-v3'
import Fingerprintjs from '@fingerprintjs/fingerprintjs'

export const useFpjsStore = defineStore(
  'fpjs',
  () => {
    const deviceId = ref('')
    const { getData } = useVisitorData(
      {
        extendedResult: true,
      },
      {
        immediate: true,
      }
    )
    /**
     * 获取【备用】设备指纹，因为正式的设备指纹Key值有时效性，所以正式失效需要获取备用的
     * @returns
     */
    const getAlternateDeviceData = async () => {
      return Fingerprintjs.load().then(async (fp) => {
        const res = await fp.get()
        return res.visitorId
      })
    }

    /**
     * 获取设备指纹
     * @returns
     */
    const getDeviceData = async () => {
      return getData().then(async (res) => {
        if (!res) {
          deviceId.value = await getAlternateDeviceData()
          return
        }
        deviceId.value = res.visitorId
      })
    }

    return {
      deviceId,
      getDeviceData,
    }
  },
  {
    persist: true,
  }
)
