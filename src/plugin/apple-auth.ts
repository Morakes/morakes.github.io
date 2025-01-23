import { apiAppleLogin, apiGetThidrPartAuthToken } from '@/apis/login'
import { removeCookie } from '@/utils/cookie'
import { loadScript } from '@/utils/loader'

const appleSDK =
  'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'

class AppleAuth {
  private config: {
    clientId: string
    [key: string]: string
  }
  private isInitialized = false
  private deviceId = ''
  private isResolved: ((...arg: any) => void) | undefined
  private isRejected: ((...arg: any) => void) | undefined
  constructor() {
    this.config = {
      clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
    }
    // document.addEventListener('AppleIDSignInOnSuccess', (event) => {
    //   console.log(event.detail.data)
    // })
    // document.addEventListener('AppleIDSignInOnFailure', (event) => {
    //   console.log(event.detail.error)
    // })
  }
  async init() {
    if (this.isInitialized) return
    try {
      await setupAppleSDK()

      window.AppleID.auth.init({
        clientId: this.config.clientId,
        scope: 'name email',
        redirectURI: 'https://h5.panda8s.com',
        state: 'state',
        usePopup: true,
        responseMode: 'form_post',
        responseType: 'code',
      })
      this.isInitialized = true
    } catch (error) {
      console.error('Apple 服务初始化失败:', error)
      throw error
    }
  }

  promptLogin(deviceId: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Apple ID 服务未初始化')
    }

    this.deviceId = deviceId
    return new Promise((resolve, reject) => {
      this.isResolved = resolve
      this.isRejected = reject
      // this.handleCredentialResponse({
      //   authorization: {
      //     id_token:
      //       'eyJraWQiOiJGZnRPTlR4b0VnIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiUGFuZGFUVi1QV0EiLCJleHAiOjE3MzY0MjI1OTIsImlhdCI6MTczNjMzNjE5Miwic3ViIjoiMDAxOTE3LmJiMmU3NmUxZGNmZjRkOTFiMjkwODFhNjJkZTkxMWYwLjEwMTgiLCJjX2hhc2giOiJ5ZWM3NWM3NU1IakZ4elhqcjRlX01nIiwiZW1haWwiOiJkMTMyNTA3Mzk1MTRAYWxpeXVuLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE3MzYzMzYxOTIsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.Q-fk2urUPv-Gt1CMOJTLKSAhmRtIyL-g0IHz84RnqipykdbFj3AOIaxwR9lcL8jLrZyyddHFdouAeHZNqW1ovs84U1LLpbrZg-RcdOIV85jYZCCxX-t0UmxYCPE-Wk6PJ1aKM4TX1xXJMTxdou29xfcT-7W9ivS6jBju9ACRg2X8qBQrRyOOqJtJpO5-MP_WEu8rV_-jDTw9TDIQMTR3CgwL1U7VXemzGGuIETI1Nm03a6D3qDzscUzsdg7TnUKAW3PgQm5U5uZHFiWG239tBg2ijJSJJ3GghRkDI9fYmBh6yXHLClE1Te4UZSjwhxNAJ2fbbN2U-O21aHvtAZs4lQ',
      //   },
      // })
      // return
      window.AppleID.auth
        .signIn()
        .then((res: CredentialResponse) => {
          this.handleCredentialResponse(res)
        })
        .catch(() => {
          reject('login failed')
        })
    })
  }

  // https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple
  private async handleCredentialResponse(response: CredentialResponse): Promise<void> {
    try {
      if (response) {
        // 处理登录成功
        await this.sendLoginToServer({
          thirdToken: response.authorization.id_token,
          thirdId: this.config.clientId,
          deviceid: this.deviceId,
        })
        this.isResolved?.('apple')
      }
    } catch (error) {
      this.isRejected?.('处理登录响应失败')
      throw error
    }
  }

  private async sendLoginToServer(data: { thirdToken: string; thirdId: string; deviceid: string }) {
    try {
      const {
        data: { authToken },
      } = await apiGetThidrPartAuthToken(data.deviceid)

      return apiAppleLogin({
        ...data,
        authToken,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async logout(): Promise<void> {
    // 目前 Apple ID SDK 不提供直接的退出登录方法
    removeCookie('apple_auth_state') // 清除相关 cookie
  }
}

const setupAppleSDK = async () => {
  await loadScript(appleSDK, 1)
}

export default AppleAuth

interface CredentialResponse {
  authorization: {
    code: string
    state: string
    id_token: string
  }
  user: {
    email: string
    name: {
      firstName: string
      lastName: string
    }
  }
}
