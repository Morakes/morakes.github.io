import { apiGetToken, apiRefreshToken } from '@/apis/login'
import { TOKEN_PREFIX } from '@/constant/common'
import { getBrand, getLangType, getOS } from '@/utils/common'

export const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref<string>()
    const thirdPartLoginType = ref<'google' | 'apple' | 'facebook'>()
    // const nextLoginTime = ref<number>()
    const getToken = () => {
      return token.value
    }
    const setToken = (value?: string) => {
      if (!value) {
        token.value = undefined
        return
      }
      token.value = `${TOKEN_PREFIX}${value}`
    }

    /**
     *  获取token
     * @param deviceId
     */
    const login = async (deviceId: string) => {
      const res = await apiGetToken({
        deviceid: deviceId,
        os: getOS(),
        langType: getLangType(),
        regBrand: getBrand(),
        timestamp: new Date().getTime(),
      })
      if (res.code === 200) {
        setToken(res.data.token)
      }
    }

    /**
     * 续签token
     */
    const refreshToken = async () => {
      const res = await apiRefreshToken({
        token: getToken()!,
        requestTime: new Date().getTime(),
        appPacketAliasName: TOKEN_PREFIX.replace(':', ''),
      })

      setToken(res.data.token)
    }

    /**
     * 第三方登出
     */
    const logout = async () => {
      thirdPartLoginType.value = undefined
    }

    /**
     * 重新登录
     */

    const reLogin = async () => {
      // 清空token
      setToken(undefined)
      window.location.reload()
    }

    return {
      setToken,
      getToken,
      login,
      refreshToken,
      logout,
      reLogin,
      token,
      thirdPartLoginType,
    }
  },
  {
    persist: {
      pick: ['token', 'thirdPartLoginType'],
    },
  }
)
