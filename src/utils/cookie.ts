export function removeCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;' // 设置过期时间为过去的时间
}
