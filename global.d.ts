// class StartADComponent {}
// class MemoryPlayComponent {}

declare global {
  type Dict<V = any> = Record<string, V>

  type Res<T> = {
    data: T
    code: number
    message: string
  }

  type Page = {
    page: number
    pagesize: number
  }

  /** arms 全局BL对象 */
  interface BlConfig {
    config: {
      /** 站点id */
      pid: string
      /** 用户id */
      uid?: string
      /** 站点类型 */
      appType: string
      /** 站点上报地址 */
      imgUrl: string
      /** 是否上报静态资源 */
      sendResource: boolean
      /** 是否开启链路追踪 */
      enableLinkTrace: boolean
      /** 是否开启用户行为采集 */
      behavior: boolean
      /** 是否开启SPA模式 */
      enableSPA: boolean
      /** 是否开启首次加载性能采集 */
      useFmp: boolean
      /** 版本号 */
      release: `${bigint}.${bigint}.${bigint}`
      /**  环境类型  */
      environment: 'prod' | 'gray' | 'pre' | 'daily' | 'local'
      /** 传入的标记，每条日志都会携带该标记, 此处用作标识不同的代理包 */
      tag?: string
    }
    setConfig?: (config: { uid?: string; setUsername?: () => string }) => void
  }

  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (callback?: (notification: any) => void) => void
          renderButton: (element: HTMLElement, config: any) => void
          disableAutoSelect: () => void
          storeCredential: (credential: any, callback: () => void) => void
          cancel: () => void
          revoke: (userId: string, callback: () => void) => void
        }
      }
    }

    AppleID: {
      auth: {
        init: (config: any) => void
        signIn: () => Promise<any>
        renderButton: () => void
      }
    }

    FB: {
      init: (config: any) => void
      login: (callback: (response: any) => void, options?: any) => void
      logout: (callback: (response: any) => void) => void
      api: (path: string, method: string, params: any, callback: (response: any) => void) => void
      getLoginStatus: (callback: (response: any) => void) => void
    }

    __bl: BlConfig
  }

  interface ServiceWorkerGlobalScope extends ServiceWorkerGlobalScopeEventMap {
    __WB_DISABLE_DEV_LOGS: boolean
    skipWaiting(): unknown
    clients: any
    registration: any
    addEventListener(arg0: string, arg1: (event: any) => void): unknown
    __WB_MANIFEST: Array<{
      revision: string | null
      url: string
    }>
  }

  interface ServiceWorkerGlobalScopeEventMap
    extends WindowEventHandlersEventMap,
      WorkerGlobalScopeEventMap {
    activate: ExtendableEvent
    fetch: FetchEvent
    install: ExtendableEvent
    message: ExtendableMessageEvent
    notificationclick: NotificationEvent
    notificationclose: NotificationEvent
    push: PushEvent
    pushsubscriptionchange: PushSubscriptionChangeEvent
    sync: SyncEvent
  }

  declare let self: ServiceWorkerGlobalScope
}

export {}
