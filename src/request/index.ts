import { getLangType, getOS } from '@/utils/common'
import { alovaInstance } from './alova'

// const headers = { 'Content-Type': 'application/json;charset=UTF-8' }

type ConfigType = Parameters<typeof alovaInstance.Post>['2']

const commonParams = {
  langType: getLangType(),
  timestamp: new Date().getTime(),
  os: getOS(),
}

const mergeParams = (data: any) => {
  if (data instanceof FormData) {
    return data
  }
  if (typeof data === 'object') {
    return {
      ...commonParams,
      ...data,
    }
  }
  if (typeof data === 'undefined') {
    return {
      ...commonParams,
    }
  }
  return {}
}

export const request = {
  get<T>(url: string, params?: Record<string, any>) {
    return alovaInstance.Get<T>(url, {
      params: mergeParams(params),
    })
  },
  post<T>(url: string, data: Record<string, any>, config?: ConfigType) {
    const params = mergeParams(data)
    return alovaInstance.Post<T>(url, params, {
      ...(config as Record<string, any>),
    })
  },
  put<T>(url: string, data?: Record<string, any>, config?: ConfigType) {
    return alovaInstance.Put<T>(url, mergeParams(data), {
      ...(config as Record<string, any>),
    })
  },
  delete<T>(url: string, data?: Record<string, any>, config?: ConfigType) {
    return alovaInstance.Delete<T>(url, mergeParams(data), {
      ...(config as Record<string, any>),
    })
  },
  patch<T>(url: string, data?: Record<string, any>, config?: ConfigType) {
    return alovaInstance.Patch<T>(url, mergeParams(data), {
      ...(config as Record<string, any>),
    })
  },
}
