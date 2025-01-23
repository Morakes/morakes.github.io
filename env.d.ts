/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
import dayjs from 'dayjs'

interface ImportMetaEnv {
  readonly VITE_MOCK_API_BASE: string
  readonly VITE_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'virtual-icons' {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs
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
