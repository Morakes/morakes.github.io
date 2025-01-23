import { request } from '@/request'

export interface TaskType {
  missionid: string
  title: string
  desc: string
  status: number
  reward: {
    type: string
    amount: number
  }
  /** Unix timestamp */
  startTime: number
  /** Unix timestamp */
  endTime: number
  /** 是否完成 0-否 1-是 */
  isFinished: 0 | 1
  progressBar: {
    cur: number
    total: number
  }
}

/**
 * 获取任务列表
 * @returns
 */
export const apiGetTaskList = () => {
  return request.get<Res<TaskType[]>>('/h5/v1/mission/list', {})
}

export interface SigninType {
  title: string
  desc: string
  coin: {
    title: string
    coin: number
    // 是否签到 1是 0否
    signed: 0 | 1
  }[]
}
/**
 * 获取签到信息
 * @returns
 */
export const apiGetSigninInfo = () => {
  return request.get<Res<SigninType>>('/h5/v1/signin/info')
}

/**
 * 签到
 * @returns
 */
export const apiSignin = () => {
  return request.post<
    Res<{
      reward: { type: 'coin'; amount: number }
    }>
  >('/h5/v1/signin/sign', {})
}

/**
 * 完成任务
 * @param missionid 任务id
 */
export const apiFinishTask = (missionid: string) => {
  return request.post('/h5/v1/mission/complete', { missionid })
}
