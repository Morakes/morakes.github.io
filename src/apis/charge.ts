import { request } from '@/request'

export interface ChargeRecordType {
  text: string
  time: number
  price: number
  id: string
}

/**
 * 获取充值记录
 * @param data 分页
 * @returns
 */
export const apiGetChargeRecord = async (data: Page) =>
  request
    .get<Res<{ list: ChargeRecordType[]; total: number; totalPage: number }>>(
      '/h5/v1/user/log/charge',
      {
        ...data,
        timestamp: undefined,
      }
    )
    .send(true)

export interface ChargeTemplateType {
  bundleid: string
  productid: string
  productType: number
  parentProductid: string
  price: number
  type: number
  subtype: number
  amount: number
  reward: Reward
  style: Style
}

export interface Reward {
  freebie: {
    type: number
    amount: number
  }[]
}

export interface Style {
  badge: Badge[]
  backgroundImage: string
  backgroundColor: string
  recharge: Recharge
  promotion: Promotion
}

export interface Badge {
  text: string
  position: number
  color: string
  topLeftRadius: string
  topRightRadius: string
  bottomLeftRadius: string
  bottomRightRadius: string
  backgroundColor: string
}

export interface Recharge {
  text: string
  color: string
  priceColor: string
}

export interface Promotion {
  text: string
  color: string
}

/**
 * 获取充值模板
 * @returns
 */
export const apiGetChargeTemplate = async () =>
  request.get<
    Res<{
      items: ChargeTemplateType[]
      chargeTemplateid: string
      templateGroupid: string
    }>
  >('/h5/v1/pay/template')
