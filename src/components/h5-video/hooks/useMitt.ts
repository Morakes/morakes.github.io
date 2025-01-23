import mitt from 'mitt'

export const emitter = mitt()
/** 订阅事件 */
export function useOn(type: EVENT_KEY, handler: (event: any) => void) {
  on()
  onUnmounted(off)

  function on() {
    emitter.on(type, handler)
  }

  function off() {
    emitter.off(type, handler)
  }
}

/** 发布事件 */
export function useEmit(type: EVENT_KEY, data?: any) {
  emitter.emit(type, data)
}

/** 取消事件 */
export function useOff(type: EVENT_KEY, handler?: (event: any) => void) {
  emitter.off(type, handler)
}

export enum EVENT_KEY {
  /**打开评论弹窗 */
  COMMENT_OPEN = 'COMMENT_OPEN',
  /** 回复评论 */
  COMMENT_REPLY = 'COMMENT_REPLY',
  /** 选集 */
  SELECT_EPISODE = 'SELECT_EPISODE',
  /** 修改播放倍速 */
  CHANGE_PLAYBACK_RATE = 'CHANGE_PLAYBACK_RATE',
  /** 单击红心点赞/取消点赞 */
  HEART_CLICK = 'HEART_CLICK',
  /** 收藏/取消收藏 */
  COLLECT_CLICK = 'COLLECT_CLICK',
  /** 进入全屏 */
  ENTER_FULLSCREEN = 'ENTER_FULLSCREEN',
  /** 退出全屏 */
  EXIT_FULLSCREEN = 'EXIT_FULLSCREEN',
  /** 切换全屏 */
  TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN',
  /** 允许视频滑动否 */
  ALLOW_TOUCH_MOVE = 'ALLOW_TOUCH_MOVE',
  /** 观看位置上报 */
  WATCHED_REPORT = 'WATCHED_REPORT',
  /** 播放 */
  PLAY = 'PLAY',
  /** 暂停 */
  PAUSE = 'PAUSE',
  /** 播放结束 */
  ENDED = 'ENDED',
  /** 播放进度更新 */
  UPDATE_PROGRESS = 'UPDATE_PROGRESS',
  /** 播放错误 */
  WATCHED_ERROR = 'WATCHED_ERROR',
  /** 切换剧集 */
  CHANGE_EPOSIDE = 'CHANGE_EPOSIDE',
  /** 分享 */
  SHOW_SHARE = 'SHOW_SHARE',
  /** 控制浮动面板收缩 */
  SET_FLOATING_PANEL = 'SET_FLOATING_PANEL',
  /** 通知store更新初始数据 即更换视频数据 */
  INIT_STORE_DATA = 'INIT_STORE_DATA',
}
