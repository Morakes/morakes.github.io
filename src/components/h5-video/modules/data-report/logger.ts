// @ts-check

/**
 * 观看记录类
 */
export class WatchLogger {
  /** 观看进度 */
  watchProgress = 0
  /** 观看总时长 */
  totalTime = 0
  /** 开始观看时间 */
  startTime = 0
  /** 结束观看时间 */
  endTime = 0
  constructor() {}
  /**
   * 设置观看进度
   * @param {number} val 观看进度
   * @returns {void}
   */
  setWatchProgress(val: number): void {
    this.watchProgress = val
  }
  /**
   * 获取观看进度
   * @returns {number} 观看进度
   */
  getWatchProgress(): number {
    // 播放进度带小数点，往下取整，避免超出观看进度
    return Math.floor(this.watchProgress)
  }
  /**
   * 开始记录观看时间
   * @returns {void}
   */
  startRecord(): void {
    this.startTime = this.getNowTime()
  }
  /**
   * 返回当前时间的时间戳
   * @returns {number} 时间戳
   */
  getNowTime(): number {
    return Date.now()
  }
  /**
   * 获取观看总时长
   * @returns {number} 观看总时长
   */
  getTotalTime(): number {
    return Math.ceil(this.totalTime / 1000)
  }
  /**
   * 保存观看时间到totalTime(总观看时间里)
   * @returns {void}
   */
  saveWatchTime(): void {
    if (this.startTime > 0) {
      this.endTime = this.getNowTime()
      this.totalTime += Math.max(this.endTime - this.startTime, 0)
      this.startTime = this.endTime = 0
    }
  }
  /**
   * 重置数据
   * @returns {void}
   */
  resetData(): void {
    this.startTime = 0
    this.endTime = 0
    this.totalTime = 0
    this.setWatchProgress(0)
  }
}
