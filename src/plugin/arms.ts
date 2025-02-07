import BrowerLogger from '@arms/js-sdk'

export function setupARMS() {
  // 本地环境不上报arms
  if (import.meta.env.VITE_APP_ARMS_ENVIRONMENT === 'local') return

  const __bl = BrowerLogger.singleton({
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
  })

  window.__bl = __bl
}
