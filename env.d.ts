/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

interface ImportMetaEnv {
  readonly VITE_MOCK_API_BASE: string
  readonly VITE_API_BASE: string
  readonly VITE_APP_ARMS_ENVIRONMENT: 'prod' | 'gray' | 'pre' | 'daily' | 'local'
  readonly VITE_APP_MODE: string
  readonly VITE_FPJS_API_KEY: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_ID: number
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_FACEBOOK_APP_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'virtual-icons' {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, values?: Record<string, any>) => string
  }
}

declare module 'colorthief' {
  export type RGBColor = [number, number, number]
  export default class ColorThief {
    getColor: (img: HTMLImageElement, quality: number) => RGBColor | null

    getPalette: (
      img: HTMLImageElement,
      colorCount: number = 10,
      quality: number = 10
    ) => RGBColor[] | null
  }
}

declare module 'aliyun-aliplayer'
