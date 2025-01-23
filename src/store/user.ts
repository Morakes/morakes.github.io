import { apiGetUserInfo, apiUpdateUserInfo, UserInfoType } from '@/apis/user-center'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfoType>()

  const getUserInfo = async () => {
    const res = await apiGetUserInfo()
    userInfo.value = res.data
  }

  const updateUserInfo = async (data: Partial<UserInfoType>) => {
    await apiUpdateUserInfo(data)

    userInfo.value = {
      ...userInfo.value!,
      ...data,
    }
  }

  return {
    userInfo,
    getUserInfo,
    updateUserInfo,
  }
})
