class StartADComponent {}
class MemoryPlayComponent {}

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
