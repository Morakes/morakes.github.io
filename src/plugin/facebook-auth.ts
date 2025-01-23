import { apiGetThidrPartAuthToken, apiFbLogin } from '@/apis/login'
import { removeCookie } from '@/utils/cookie'
import { loadScript } from '@/utils/loader'

const facebookSDK = 'https://connect.facebook.net/en_US/sdk.js'

class FacebookAuth {
  private config: { appId: string }
  private deviceId = ''
  private isInitialized = false
  private isResolved: ((...arg: any) => void) | undefined
  private isRejected: ((...arg: any) => void) | undefined

  constructor(config: any) {
    this.config = {
      appId: import.meta.env.VITE_FACEBOOK_APP_ID,
      ...config,
    }
  }

  async init(): Promise<void> {
    if (this.isInitialized) return

    try {
      await this.loadFacebookScript()
      window.FB.init({
        appId: this.config.appId,
        cookie: true,
        xfbml: false,
        version: 'v21.0',
      })

      this.isInitialized = true
    } catch (error) {
      console.error('Facebook SDK 初始化失败:', error)
      throw error
    }
  }

  private loadFacebookScript(): Promise<unknown> {
    return loadScript(facebookSDK, 1)
  }
  // https://developers.facebook.com/docs/reference/javascript/FB.login/v21.0
  promptLogin(deviceId: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Facebook SDK 未初始化')
    }
    this.deviceId = deviceId

    return new Promise((resolve, reject) => {
      this.isResolved = resolve
      this.isRejected = reject

      window.FB.login(
        (response: CallbackResponse) => {
          if (response.authResponse && response.status === 'connected') {
            this.handleCredentialResponse(response.authResponse)
          } else {
            reject('login failed')
          }
        },
        { scope: 'email' }
      )
    })
  }

  private async handleCredentialResponse(response: CredentialResponse): Promise<void> {
    try {
      if (response.accessToken) {
        // 处理登录成功
        await this.sendLoginToServer({
          thirdToken: response.accessToken,
          deviceid: this.deviceId,
        })

        this.isResolved?.('facebook')
      }
    } catch (error) {
      this.isRejected?.(error)
      throw error
    }
  }

  async logout(): Promise<void> {
    return new Promise((resolve) => {
      window.FB.logout(() => {
        removeCookie('fb_auth_state') // 清除相关 cookie
        resolve()
      })
    })
  }

  private async sendLoginToServer(data: { thirdToken: string; deviceid: string }) {
    try {
      const {
        data: { authToken },
      } = await apiGetThidrPartAuthToken(data.deviceid)

      return apiFbLogin({
        ...data,
        authToken,
        /** 写死1-->安卓，第三方登录历史遗留问题 */
        os: 1,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default FacebookAuth

interface CredentialResponse {
  accessToken: string
  data_access_expiration_time: number
  expiresIn: number
  graphDomain: string
  signedRequest: string
  userID: string
}

interface CallbackResponse {
  authResponse: CredentialResponse
  status: 'unkonwn' | 'not_authorized' | 'connected'
}
