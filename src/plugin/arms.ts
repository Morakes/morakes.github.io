export function setupARMS() {
  // 本地环境不上报arms
  if (import.meta.env.VITE_APP_ARMS_ENVIRONMENT === 'local') return

  window.__bl = {
    config: {
      pid: 'jc4d7xmr08@fac759ff322dbcd',
      appType: 'web',
      imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
      sendResource: true,
      enableLinkTrace: true,
      behavior: true,
      enableSPA: true,
      useFmp: true,
      release: '1.0.0',
      environment: import.meta.env.VITE_APP_ARMS_ENVIRONMENT,
      tag: import.meta.env.VITE_APP_NAME,
    },
  }

  const scriptElement = document.createElement('script')
  scriptElement.src = 'https://retcode.alicdn.com/retcode/bl.js'
  scriptElement.crossOrigin = ''

  const bodyElement = document.body
  if (bodyElement) {
    const firstChild = bodyElement.firstChild
    bodyElement.insertBefore(scriptElement, firstChild)
  }
}
