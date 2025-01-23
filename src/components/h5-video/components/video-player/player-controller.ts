import Aliplayer from 'aliyun-aliplayer'
import { EVENT_KEY, useEmit, useOn } from '../../hooks/useMitt'
import { playerStore } from '../../store/index'
import { useThrottleFn } from '@vueuse/core'

export class PlayerController {
  /** 播放器实例 */
  private pm: typeof Aliplayer
  /** 订阅事件列表 */
  private events: { event: EVENT_KEY; handler: (...args: any[]) => void }[]
  /** 播放状态 */
  playing: Ref<boolean>
  constructor() {
    this.pm = undefined
    this.playing = ref(true)

    this.events = [
      {
        /** 修改播放速度 */
        event: EVENT_KEY.CHANGE_PLAYBACK_RATE,
        handler: this._changePlaybackRate.bind(this),
      },
      {
        /** 全屏 */
        event: EVENT_KEY.ENTER_FULLSCREEN,
        handler: this._enterFullscreen.bind(this),
      },
      {
        /** 退出全屏 */
        event: EVENT_KEY.EXIT_FULLSCREEN,
        handler: this._exitFullscreen.bind(this),
      },
    ]
  }

  async init() {
    await this._fetchResoruce()

    this._createPlayer({
      url: this._getVudeoUrl(),
      cover: playerStore.state.videoInfo.cover,
    })

    this.subscribe()
  }

  /**
   * 创建播放器
   */
  private _createPlayer({
    url,
    watchStartTime,
    cover,
  }: {
    url: string
    watchStartTime?: number
    cover?: string
  }) {
    this.pm = new Aliplayer({
      id: 'panda-tv-player',
      license: {
        domain: 'nald9i.com',
        key: 'bPENpD7gGB2BT4R3Uad60f9ad9c0347bb807663a038983ed6',
      },
      source: url,
      cover,
      watchStartTime,
      clickPause: true, // 单击播放暂停
      // ratio: 9 / 16,
      height: '100%',
      width: '100%',
      autoplay: false, //有声自动播放
      autoplayPolicy: {
        fallbackToMute: true, // 有声自动播放失败后，是否降级为静音自动播放
        showUnmuteBtn: false, // 静音自动播放时，是否居中显示静音大按钮
      },
      rePlay: true, //循环播放
      playsinline: true, //内置播放
      vodRetry: 3, // 点播失败重试次数，默认3次
      waitingTimeout: 60, //最大缓冲超时时间，超过这个时间会有错误提示，单位：秒。默认60秒。
      showBarTime: 3,
      preload: true, //自动加载
      useH5Prism: true, //使用h5播放器
      skinLayout: [
        {
          name: 'H5Loading',
          align: 'cc',
        },
        {
          name: 'controlBar',
          align: 'blabs',
          x: 0,
          y: -35,
          children: [
            { name: 'progress', align: 'blabs', x: 0, y: 0 },
            // { name: 'playButton', align: 'tl', x: 15, y: 12 },
            // { name: 'timeDisplay', align: 'tl', x: 10, y: 7 },
            // { name: 'fullScreenButton', align: 'tr', x: 10, y: 12 },
            // { name: 'subtitle', align: 'tr', x: 15, y: 12 },
            // { name: 'setting', align: 'tr', x: 15, y: 12 },
            // { name: 'volume', align: 'tr', x: 5, y: 10 },
          ],
        },
      ],
    })
  }

  /**
   * 订阅播放器事件  自定义事件
   */
  private subscribe() {
    this.events.forEach((item) => {
      useOn(item.event, item.handler)
    })

    this.pm.on('init', () => {})

    this.pm.on('ready', () => {
      this.pm.setVolume(0)
      this.pm.play()
    })

    this.pm.on('play', () => {
      useEmit(EVENT_KEY.PLAY, { pTime: this.pm.getCurrentTime() })
    })

    this.pm.on('playing', () => {
      this.playing.value = true
    })

    this.pm.on('pause', () => {
      this.playing.value = false
      useEmit(EVENT_KEY.PAUSE, { pTime: this.pm.getCurrentTime() })
    })

    this.pm.on('error', function (e: any) {
      const errorData = e.paramData
      useEmit(EVENT_KEY.WATCHED_ERROR)
      console.error('播放失败', errorData)
    })

    this.pm.on(
      'ended',
      useThrottleFn(() => {
        useEmit(EVENT_KEY.UPDATE_PROGRESS, { pTime: this.pm.getCurrentTime() })
        useEmit(EVENT_KEY.ENDED)
      })
    )

    this.pm.on(
      'timeupdate',
      useThrottleFn(() => {
        useEmit(EVENT_KEY.UPDATE_PROGRESS, { pTime: this.pm.getCurrentTime() })
        // 保留播放时间副本
        playerStore.updateStore({
          playTime: Math.floor(this.pm.getCurrentTime()),
        })
      }, 1000)
    )

    this.pm.on('dispose', () => {
      // 进入可播放状态之后才进行上报  防止剧集滑动过快产生无用上报
      if (['loading', 'ready', 'init'].includes(this.pm.getStatus())) return

      useEmit(EVENT_KEY.UPDATE_PROGRESS, { pTime: this.pm.getCurrentTime() })
      useEmit(EVENT_KEY.CHANGE_EPOSIDE)
    })

    /** 拖拽进度条触发进度更新 目前可以不用 因为 timeupdate 事件会自动触发每隔三秒 */
    // this.pm.on('completeSeek', (e: any) => {
    //   useEmit(EVENT_KEY.UPDATE_PROGRESS, { pTime: e.paramData as number })
    // })
  }

  /** 修改播放速度 */
  private _changePlaybackRate(value: number) {
    this.pm.setSpeed(value)
  }
  /** 进入全屏 */
  private _enterFullscreen() {
    playerStore.updateStore({
      isFullScreen: true,
    })
  }
  /** 退出全屏 */
  private _exitFullscreen() {
    playerStore.updateStore({
      isFullScreen: false,
    })
  }

  /** 获取资源 */
  private async _fetchResoruce() {
    return await playerStore.getEpisodeDetail()
  }

  /** 获取播放链接 */
  private _getVudeoUrl() {
    return playerStore.state.episodeDetail.linkInfo?.[0]?.linkUrl
  }

  /** 播放 */
  setPlay() {
    this.pm.play()
  }
  /** reverse */
  reverse() {
    // this.pm.setPreviewTime(5)
    // this.pm.fullscreenService.cancelFullScreen()
    // this.pm.setRotate(90)
    // this.pm.fullscreenService.requestFullScreen()
  }

  /** 获取实例 */
  getInstance() {
    return this.pm
  }

  /** 销毁 */
  destory() {
    this.pm?.dispose()
  }
}
