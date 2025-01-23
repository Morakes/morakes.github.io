import { request } from '@/request'
/**
 *
 * @returns token 用户 token ，用来校验登录状态
 * @returns isRegister 是否注册过，0 未注册，1 已注册
 */
export type LoginRes = Res<{
  token: string
  isRegister: 0 | 1
}>

export interface GetTokenParams {
  deviceid: string
  os: number
  langType: number
  regBrand: string
  timestamp: number
}

/**
 * 游客登录 source 1:app  2:h5
 * @param data
 * @returns
 */
export const apiGetToken = async (data: GetTokenParams) => {
  return request.post<LoginRes>(
    '/h5/v1/user/autoreg',
    { ...data, source: 2 },
    { shareRequest: true }
  )
}

interface RefreshTokenParams {
  requestTime: number
  token: string
  appPacketAliasName: string
}

export const apiRefreshToken = async (data: RefreshTokenParams) => {
  return request.post<Res<{ token: string }>>('/h5/v1/refreshtoken', data)
}

/**
 * google登录
 * @param data
 * @param data.thirdToken google的idToken
 * @param data.thirdId google的clientId
 * @returns
 */
export const apiGoogleLogin = (data: {
  thirdToken: string
  thirdId: string
  deviceid: string
  authToken: string
}) => {
  return request.post('/h5/v1/login/google', {
    ...data,
  })
}

/**
 * facebook登录
 * @param data
 * @param data.thirdToken facebook的idToken
 * @param data.browserid 浏览器指纹
 * @returns
 */
export const apiFbLogin = (data: {
  thirdToken: string
  deviceid: string
  authToken: string
  os: number
}) => {
  return request.post('/h5/v1/login/facebook', {
    ...data,
  })
}

/**
 * apple登录
 * @param data
 * @param data.thirdToken apple的identityToken
 * @param data.thirdId apple的userID
 * @returns
 * @returns.loginType 1:首次绑定第三方账号; 2:当前登录的第三方账号已被绑定过，和当前的用户uid不一致，更换登录账号; 3:已绑定，当前授权的账号跟登录账号一致;
 */
export const apiAppleLogin = (data: { thirdToken: string; thirdId: string; authToken: string }) => {
  return request.post<Res<{ loginType: number }>>('/h5/v1/login/apple', {
    ...data,
  })
}

/**
 * 第三方登录授权
 * @param browserid
 * @returns
 */
export const apiGetThidrPartAuthToken = (deviceid: string) => {
  return request
    .get<Res<{ authToken: string }>>('/h5/v1/authtoken', {
      deviceid,
      requestTime: Date.now(),
    })
    .send(true)
}
