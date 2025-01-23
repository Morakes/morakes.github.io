import { apiGetThidrPartAuthToken, apiGoogleLogin } from '@/apis/login'
import { removeCookie } from '@/utils/cookie'
import { loadScript } from '@/utils/loader'

const googleSDK = 'https://accounts.google.com/gsi/client'

class GoogleAuth {
  private config: GoogleAuthConfig = {}
  private deviceId = ''
  private isInitialized = false
  private isResolved: ((...arg: any) => void) | undefined
  private isRejected: ((...arg: any) => void) | undefined

  constructor(config: GoogleAuthConfig) {
    this.config = {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      autoSelect: config.autoSelect ?? false,
      context: config.context ?? 'signin',
    }
  }

  async init(_element?: HTMLElement): Promise<void> {
    if (this.isInitialized) return

    try {
      await this.loadGoogleScript()

      window.google.accounts.id.initialize({
        client_id: this.config.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: this.config.autoSelect,
        context: this.config.context,
        use_fedcm_for_prompt: false,
        // locale: 'en-US',
      })

      this.isInitialized = true

      // this.renderLoginButton(element)
    } catch (error) {
      console.error('Google Identity Services 初始化失败:', error)
      throw error
    }
  }

  private loadGoogleScript(): Promise<void> {
    return setupGoogleSDK()
  }

  /**
   * google提供登录按钮模式
   * 渲染登录按钮
   * @param element 容器dom
   * @param options 配置项
   */
  async renderLoginButton(element: HTMLElement, customConfig = {}): Promise<void> {
    if (!this.isInitialized) {
      await this.init(element)
    }

    const buttonConfig = {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',

      ...customConfig,
    }

    window.google.accounts.id.renderButton(element, buttonConfig)
  }

  /**
   * 自定义登录按钮模式
   * google弹窗登录
   */

  promptLogin(deviceId: string): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('Google Identity Services 未初始化')
    }

    this.deviceId = deviceId
    // 必须调用函数删除g_state cookie 否则第二次无法唤醒登录弹窗
    removeCookie('g_state')

    return new Promise((resolve, reject) => {
      this.isResolved = resolve
      this.isRejected = reject
      window.google.accounts.id.prompt((notification) => {
        if (['skipped'].includes(notification.g)) {
          reject('login failed')
        }
      })
    })
  }

  /**
   * 登录成功后，调用这个回调函数解析jwt数据
   * @param response
   */
  private async handleCredentialResponse(response: CredentialResponse): Promise<void> {
    try {
      if (response.credential) {
        // 解码 JWT token 获取用户信息
        const decodedToken = this.decodeJwtToken(response.credential)

        // 处理登录成功
        const userData = {
          id: decodedToken.sub,
          email: decodedToken.email,
          name: decodedToken.name,
          imageUrl: decodedToken.picture,
          token: response.credential,
        }

        await this.sendLoginToServer({
          thirdToken: response.credential,
          thirdId: response.clientId,
          deviceid: this.deviceId,
        })
        this.isResolved?.('google')
      }
    } catch (error) {
      console.error('处理登录响应失败:', error)
      this.isRejected?.(error)
      throw error
    }
  }

  private decodeJwtToken(token: string): DecodedCredential {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('JWT 解码失败:', error)
      throw error
    }
  }

  /**
   * 退出登录
   * @param userId
   * @returns
   */
  async logout(userId: string): Promise<void> {
    return new Promise((resolve) => {
      window.google.accounts.id.revoke(userId, () => {
        resolve()
      })
    })
  }

  /**
   * 发送绑定登录请求
   * @param data
   * @returns
   */
  private async sendLoginToServer(data: { thirdToken: string; thirdId: string; deviceid: string }) {
    try {
      const {
        data: { authToken },
      } = await apiGetThidrPartAuthToken(data.deviceid)

      return apiGoogleLogin({
        ...data,
        authToken,
      })
    } catch (error) {
      console.log(error)
    }
  }

  _getClientId() {
    return this.config.clientId
  }
}

export default GoogleAuth

const setupGoogleSDK = async () => {
  await loadScript(googleSDK, 1)
}

// 类型定义
interface GoogleAuthConfig {
  clientId?: string
  callback?: (response: CredentialResponse) => void
  autoSelect?: boolean
  context?: string
}

interface CredentialResponse {
  credential: string
  clientId: string
  select_by: string
}

interface DecodedCredential {
  iss: string
  nbf: number
  aud: string
  sub: string
  email: string
  email_verified: boolean
  azp: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
  jti: string
}
