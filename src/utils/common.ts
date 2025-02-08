import { DEFAULT_LOCALE } from '@/constant/common'
import { customLocalStorage } from './storage'
import { i18n, Locale } from '@/i18n'
import dayjs from 'dayjs'

// 获取手机品牌
export const getBrand = () => {
  const ua = navigator.userAgent.toLowerCase()
  const brandMatch = ua.match(
    /android|iphone|ipad|ipod|windows phone|blackberry|symbianos|iemobile|opera mini|qqbrowser|ucbrowser|qihoo browser|baiduboxapp|baidubrowser|ucweb|360 browser|baiduhd|baidushouji|baiduhd|baiduos/i
  )

  if (brandMatch) {
    return brandMatch[0].toLowerCase()
  }

  return 'unknown'
}

/**
 * 获取系统类型
 * @returns [1 安卓] [2 ios]
 */
export const getOS = () => {
  const osMap = {
    ios: 2,
    android: 1,
  }
  const ua = navigator.userAgent
  return osMap[/(iPhone|iPad|iPod|iOS)/i.test(ua) ? 'ios' : 'android']
}

/**
 * 获取当前语言
 */
export const getLangType = () => {
  const langMap: Record<string, number> = {
    'zh-CN': 1,
    'en-US': 2,
  }
  // return langMap[navigator.language.includes('zh') ? 'zh-CN' : 'en-US']
  return langMap[(customLocalStorage.get('locale') as string) || DEFAULT_LOCALE]
}

/**
 * 数组包裹
 * @param data
 * @returns
 */
export const arrayWrap = <T>(data: T | T[]) => {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

/**
 * 时间格式化
 * @param timestamp
 * @returns
 */
export function timeAgo(timestamp: number): string {
  const past = dayjs(timestamp * 1000) // 将时间戳转换为毫秒
  const now = dayjs()
  const diff = now.diff(past, 'day') // 计算天数差

  const lang = i18n.global.locale.value as Locale

  let result: string

  if (diff >= 2) {
    // 超过2天，显示日期
    result = past.format('YYYY-MM-DD')
  } else if (diff > 0) {
    // 小于2天且大于0天，显示1天前
    result = '1 day ago'
  } else {
    // 小于1天，计算小时数
    const hours = Math.floor(now.diff(past, 'hour'))
    if (hours < 1) {
      // 小于1小时，计算分钟数
      result = `${Math.floor(now.diff(past, 'minute'))} minutes ago`
    } else {
      result = `${hours} hours ago`
    }
  }

  if (lang === 'zh-CN') {
    result = result.replace('day ago', '天前')
    result = result.replace('hours ago', '小时前')
    result = result.replace('minutes ago', '分钟前')
  }

  return result
}

/**
 * 获取浏览器窗口大小
 * @returns
 */
export function getBrowserInterfaceSize() {
  let pageWidth = window.innerWidth
  let pageHeight = window.innerHeight

  if (typeof pageWidth != 'number') {
    //在标准模式下面
    if (document.compatMode == 'CSS1Compat') {
      pageWidth = document.documentElement.clientWidth
      pageHeight = document.documentElement.clientHeight
    } else {
      pageWidth = document.body.clientWidth
      pageHeight = window.document.body.clientHeight
    }
  }

  return {
    pageWidth: pageWidth,
    pageHeight: pageHeight,
  }
}

/**
 * 获取静态资源图片
 * @param url 图片名称
 * @returns 图片地址
 */
export function getAssetsFile(url: string, type: 'images' | 'icons' = 'icons') {
  return new URL(`../assets/${type}/${url}`, import.meta.url).href
}
