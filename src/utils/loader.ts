// 脚本加载器配置
const SCRIPT_CONFIG = {
  maxRetries: 3, // 最大重试次数
  retryDelay: 1000, // 重试延迟(毫秒)
  timeout: 10000, // 加载超时时间(毫秒)
}

/**
 * 动态加载脚本
 * @param url 脚本地址
 * @param retryTimes 重试次数
 * @returns Promise
 */
export function loadScript(url: string, retryTimes = SCRIPT_CONFIG.maxRetries) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url

    // 添加超时处理
    const timeoutId = setTimeout(() => {
      cleanup()
      if (retryTimes > 0) {
        // console.log(`加载超时,还剩${retryTimes}次重试机会`)
        loadScript(url, retryTimes - 1)
          .then(resolve)
          .catch(reject)
      } else {
        // reject(new Error('加载超时,重试次数已用完'))
      }
    }, SCRIPT_CONFIG.timeout)

    function cleanup() {
      clearTimeout(timeoutId)
      script.onload = script.onerror = null
      script.remove()
    }
    // 加载成功
    script.onload = () => {
      cleanup()
      resolve(true)
    }
    // 监听加载失败
    script.onerror = () => {
      cleanup()
      if (retryTimes > 0) {
        // console.log(`动态加载失败,还剩${retryTimes}次重试机会`)
        setTimeout(() => {
          loadScript(url, retryTimes - 1)
            .then(resolve)
            .catch(reject)
        }, SCRIPT_CONFIG.retryDelay)
      } else {
        // reject(new Error('动态加载失败,重试次数已用完'))
      }
    }

    document.head.appendChild(script)
  })
}

/**
 * 判断是否已经加载过该脚本
 * @param src 脚本地址
 * @returns
 */
export const isScriptExist = (src: string) => {
  const scripts = document.getElementsByTagName('script')
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src === src) {
      return true
    }
  }
  return false
}

/**
 * 移除已加载的脚本
 * @param src 脚本地址
 */
export const removeScript = (src: string) => {
  const scripts = document.getElementsByTagName('script')
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src === src) {
      scripts[i].parentNode?.removeChild(scripts[i])
    }
  }
}
