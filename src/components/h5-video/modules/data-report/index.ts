import { apiReportVideoPosition } from '@/apis/video'
import { playerStore } from '../../store/index'
import { EVENT_KEY, useOn } from '../../hooks/useMitt'
import { WatchLogger } from './logger'

export class DataReport {
  private events: { event: EVENT_KEY; handler: (...args: any[]) => void }[]
  private watchLogger = new WatchLogger()
  constructor() {
    this.events = [
      {
        event: EVENT_KEY.PLAY,
        handler: this._onVideoPlay.bind(this),
      },
      {
        event: EVENT_KEY.PAUSE,
        handler: this._onVideoPause.bind(this),
      },
      {
        event: EVENT_KEY.ENDED,
        handler: this._onVideoEnded.bind(this),
      },
      {
        event: EVENT_KEY.UPDATE_PROGRESS,
        handler: this._onVideoUpdateProgress.bind(this),
      },
      {
        event: EVENT_KEY.WATCHED_ERROR,
        handler: this._onVideoError.bind(this),
      },
      {
        event: EVENT_KEY.CHANGE_EPOSIDE,
        handler: this._onVideoChangeEposide.bind(this),
      },
    ]
    this.subscribe()
  }

  private subscribe() {
    this.events.forEach((item) => {
      useOn(item.event, item.handler)
    })
  }

  // 播放事件
  private _onVideoPlay() {
    this.watchLogger.startRecord()
  }
  // 暂停事件
  private _onVideoPause() {
    this.watchLogger.saveWatchTime()
  }
  // 播放结束事件
  private _onVideoEnded() {
    this.watchLogger.saveWatchTime()
    this._reportWatchVideo()
  }
  // 进度更新事件
  private _onVideoUpdateProgress({ pTime }: { pTime: number }) {
    this.watchLogger.setWatchProgress(pTime)
  }
  // 播放错误事件
  private _onVideoError() {
    this.watchLogger.saveWatchTime()
  }

  // 切换剧集事件
  private _onVideoChangeEposide() {
    this.watchLogger.saveWatchTime()
    this._reportWatchVideo()
  }

  // 上报播放进度
  private async _reportWatchVideo() {
    const watchTime = this.watchLogger.getTotalTime() || 0
    const watchProgress = this.watchLogger.getWatchProgress() || 0
    // 重置上报数据
    this.watchLogger.resetData()

    await apiReportVideoPosition({
      videoid: playerStore.state.videoInfo.videoid,
      episodeid: playerStore.state.currentEpisode!.episodeid,
      triggerTime: +new Date(),
      watchTime: watchTime,
      watchPosition: watchProgress,
    })
  }
}
