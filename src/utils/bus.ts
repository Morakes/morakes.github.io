class EventBus {
  private eventMap: Map<EVENT_KEY, CBFunc[]>

  constructor() {
    this.eventMap = new Map()
  }

  on(eventType: EVENT_KEY, cb: CBFunc) {
    let cbs = this.eventMap.get(eventType)
    if (cbs) {
      cbs.push(cb)
    } else {
      cbs = [cb]
    }
    if (cbs.length > 10) {
      // console.error('eventMap', this.eventMap)
    }
    this.eventMap.set(eventType, cbs)
  }

  once(eventType: EVENT_KEY, cb: CBFunc) {
    this.eventMap.set(eventType, [cb])
  }

  off(eventType: EVENT_KEY, fn?: CBFunc) {
    const exitCBs = this.eventMap.has(eventType)
    if (exitCBs) {
      if (fn) {
        const cbs = this.eventMap.get(eventType)!
        const rIndex = cbs.findIndex((v) => v === fn)
        if (rIndex > -1) {
          cbs.splice(rIndex, 1)
        }
        this.eventMap.set(eventType, cbs)
      } else {
        this.eventMap.delete(eventType)
      }
    }
  }

  offAll() {
    this.eventMap = new Map()
  }

  emit(eventType: EVENT_KEY, val?: any) {
    const cbs = this.eventMap.get(eventType)
    if (cbs) {
      cbs.map((cb) => cb(val))
    }
  }
}

export type CBFunc = (val?: any) => void

export enum EVENT_KEY {
  // 单击红心点赞/取消点赞
  HEART_CLICK = 'HEART_CLICK',
  // 收藏/取消收藏
  COLLECT_CLICK = 'COLLECT_CLICK',
  // 单击
  SINGLE_CLICK = 'SINGLE_CLICK',
  // 全屏
  ENTER_FULLSCREEN = 'ENTER_FULLSCREEN',
  // 退出全屏
  EXIT_FULLSCREEN = 'EXIT_FULLSCREEN',
  // 切换全屏
  TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN',
  // 评论
  TOGGLE_COMMENT = 'TOGGLE_COMMENT',
  // 打开评论
  OPEN_COMMENTS = 'OPEN_COMMENTS',
  // 关闭评论
  CLOSE_COMMENTS = 'CLOSE_COMMENTS',
  // 切换
  ITEM_TOGGLE = 'ITEM_TOGGLE',
  // 播放
  ITEM_PLAY = 'ITEM_PLAY',
  // 暂停
  ITEM_STOP = 'ITEM_STOP',
  // 分享
  SHOW_SHARE = 'SHOW_SHARE',
  // 更新列表
  UPDATE_ITEM = 'UPDATE_ITEM',
}

// 导出单例实例
export const bus = new EventBus()
