/**
 * 模板类型
 */
export enum TEMPLATE_MODE {
  SCROLL = 'scroll',
  VERTICAL = 'vertical',
  GIRD = 'gird',
}

/**
 * 文件上传类型
 */
export enum UPLOAD_TYPE_ENUM {
  AVATAR = 1,
  FEEDBACK = 2,
}

/**
 * 剧集锁定状态
 */
export enum LOCK_STATUS {
  UNLOCKED = 1,
  LOCKED = 0,
}

/** 默认语言 */
export const DEFAULT_LOCALE = 'en-US'

/** token 前缀 */
export const TOKEN_PREFIX = import.meta.env.VITE_APP_NAME as string

/** 存储前缀 */
export const STORAGE_PREFIX = '__panda-tv__'

export enum TASK_STATUS {
  GET = 'get',
  DONE = 'done',
  GO = 'go',
  PENDING = 'pending',
  WAITING = 'waiting',
}
