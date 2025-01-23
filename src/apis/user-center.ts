import { request } from '@/request'

export interface UserInfoType {
  userid: string
  nickname: string
  sex: number
  avatar: string
  isVip: number
  tokenStatus: number
  channel: string
  isBinding: number
  vipEndTime: number
  regTime: number
  coinBalance: number
  invitationCode: string
}

/**
 * 获取用户信息
 * @returns
 */
export const apiGetUserInfo = async () => {
  return request.get<Res<UserInfoType>>('/h5/v1/userinfo')
}

/**
 * 更新用户信息
 * @param data
 * @returns
 */
export const apiUpdateUserInfo = async (data: Partial<UserInfoType>) => {
  return request.post<Res<UserInfoType>>('/h5/v1/userinfo', data)
}

export interface FeedbackType {
  questionType: number
  name: string
}

/**
 * 获取反馈类型
 * @returns
 */
export const apiGetFeedbackType = () => {
  return request.get<Res<FeedbackType[]>>('/h5/v1/feedback/type')
}

export interface FeedbackInfoType {
  questionType: number
  content: string
  imageList: Record<string, string>[]
  communication: string
}

/**
 * 提交反馈
 * @param data
 * @returns
 */
export const apiSubmitFeedback = (data: FeedbackInfoType) => {
  return request.post<Res<{ info: string }>>('/h5/v1/feedback', {
    ...data,
    imageList: data.imageList.map((item) => item.url),
  })
}

export interface CoinConsumeType {
  title?: string // 标题，可选
  describe: string // 描述，必需
  time?: number // 购买时间，unix时间戳，可选
  price?: number // 支付金币，单位分，可选
  id: string // 记录ID，必需
  type: number // 消费类型; 3:购买整剧; 4:购买剧集;，必需
  image?: string // 封面，可选
}

/**
 * 获取消费记录
 * @param data
 * @returns
 */

export const apiGetCoinConsume = (data: Page) => {
  return request.get<{
    items: CoinConsumeType[]
    panigate: {
      rows: number
      pages: number
    }
  }>('/h5/v1/user/log/coin_consume', data)
}
