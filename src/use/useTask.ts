import {
  apiFinishTask,
  apiGetSigninInfo,
  apiGetTaskList,
  apiSignin,
  SigninType,
  TaskType,
} from '@/apis/reward'
import { STORAGE_PREFIX } from '@/constant/common'
import dayjs from 'dayjs'

const key = STORAGE_PREFIX + 'signin_time'

export function useTask() {
  const signinInfo = ref<SigninType>()
  const taskList = reactive<TaskType[]>([])

  async function fetchSignInInfo() {
    const res = await apiGetSigninInfo()
    signinInfo.value = res.data
  }

  async function fetchTaskList() {
    const res = await apiGetTaskList()
    Object.assign(taskList, res.data)
  }

  async function sendSignin() {
    return apiSignin().then((res) => {
      localStorage.setItem(key, String(new Date().getTime()))
      return res
    })
  }

  /**
   * 检查是否已经签到过
   * @returns boolean true 签到过 false 未签到
   */
  function checkSignin() {
    const prevSigninTime = localStorage.getItem(key)

    // 不存在视为未登录
    if (!prevSigninTime) return false

    // 签到日期小于当前日凌晨 可签到
    if (dayjs(Number(prevSigninTime)) < dayjs().startOf('day')) {
      return false
    } else {
      return true
    }
  }

  function finishTask(id: string) {
    return apiFinishTask(id)
  }

  return {
    signinInfo,
    taskList,
    fetchSignInInfo,
    fetchTaskList,
    sendSignin,
    checkSignin,
    finishTask,
  }
}
