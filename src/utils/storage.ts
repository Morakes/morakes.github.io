import { STORAGE_PREFIX } from '@/constant/common'

export interface Storage extends globalThis.Storage {
  set(key: string, value: any): void
  get(key: string): any
  remove(key: string): void
}

const createStorage = (storage: globalThis.Storage): Storage => {
  return {
    ...storage,

    set(key: string, value: unknown) {
      if (typeof value !== 'string') {
        value = JSON.stringify(value)
      }

      storage.setItem(`${STORAGE_PREFIX}${key}`, value as string)
    },

    get(key: string) {
      const data = storage.getItem(`${STORAGE_PREFIX}${key}`) as string

      try {
        return JSON.parse(data)
      } catch (err) {
        return data
      }
    },

    remove(key: string): void {
      storage.removeItem(`${STORAGE_PREFIX}${key}`)
    },
  }
}

export const customSessionStorage = createStorage(globalThis.sessionStorage)

export const customLocalStorage = createStorage(globalThis.localStorage)
