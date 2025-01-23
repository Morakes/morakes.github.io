import { CommentType } from '@/apis/video'
import { PayloadType } from './useComment'

export const ModuleProvideReply = Symbol('reply')

interface KeyNameType {
  [ModuleProvideReply]: {
    focusInput: (arg: PayloadType) => void
    commentList: Ref<CommentType[]>
  }
}

export const useProvide = <K extends keyof KeyNameType>(
  keyName: InjectionKey<KeyNameType[K]>,
  data: KeyNameType[K]
) => {
  provide(keyName, data)
}

export const useInject = <K extends keyof KeyNameType>(keyName: K) => {
  return inject<KeyNameType[K]>(keyName)!
}
