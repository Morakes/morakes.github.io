import type { ExtractPropTypes } from 'vue'

export type InvertRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]?: T[K]
} & {
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}

export const componentProps = {
  overlay: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: undefined,
  },
  duration: {
    type: Number,
    default: 3000,
  },
}

export type ToastProps = InvertRequired<ExtractPropTypes<typeof componentProps>>
