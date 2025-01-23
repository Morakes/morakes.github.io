import { Swiper as SwiperType } from 'swiper/types'
import { playerStore } from './store'
import { EVENT_KEY, useEmit, useOn } from './hooks/useMitt'
import { ModuleInject } from './modules'

export class SwiperManager {
  private swiperInstance: SwiperType | null = null
  private isTransitioning = false
  private activeIndex = ref(0)
  constructor() {}

  /** 初始化 */
  init(swiper: SwiperType) {
    if (!swiper) {
      throw new Error('Swiper instance is required')
    }

    this.swiperInstance = swiper
    const scope = effectScope()

    scope.run(() => {
      watchEffect(() => {
        // 播放列表为空时，不执行

        if (!playerStore.state.episodeList.length || !playerStore.state.episodeId) return

        let slideNumber = 0
        if (playerStore.state.episodeId) {
          slideNumber = playerStore.getEpisodeNumber(playerStore.state.episodeId)
        }

        this.slideTarget(slideNumber)
        scope.stop()
      })
    })

    this.subscribe()
    // 注册所有模块
    new ModuleInject()
  }
  private subscribe() {
    this.swiperInstance?.on('touchEnd', this.handleTouchEnd.bind(this))
    this.swiperInstance?.on('transitionEnd', this.handleTransitionEnd.bind(this))

    // 选集订阅
    useOn(EVENT_KEY.SELECT_EPISODE, ({ episodeId }: { episodeId: string }) => {
      this.slideTarget(playerStore.getEpisodeNumber(episodeId))

      /** 设置浮动面板位置 */
      useEmit(EVENT_KEY.SET_FLOATING_PANEL, 0)
      // 更新episodeId
      playerStore.updateStore({
        episodeId: episodeId,
      })
    })
    // 允许滑动订阅
    useOn(EVENT_KEY.ALLOW_TOUCH_MOVE, (allow: boolean) => {
      this.swiperInstance!.allowTouchMove = allow
    })
  }

  /** 播放集数跳转 */
  slideTarget(target: number) {
    if (this.swiperInstance) {
      this.swiperInstance.slideTo(target, 0)
      this.activeIndex.value = target

      playerStore.checkLock()
    }
  }

  canSlidePrev(): boolean {
    return this.activeIndex.value !== 0
  }

  canSlideNext(): boolean {
    return this.activeIndex.value !== playerStore.state.episodeList.length - 1
  }

  private handleTouchEnd() {
    this.isTransitioning = true
  }
  private handleTransitionEnd() {
    if (this.isTransitioning) {
      this.isTransitioning = false
      if (this.swiperInstance) {
        this.activeIndex.value = this.swiperInstance.activeIndex

        playerStore.updateStore({
          episodeId: playerStore.state.episodeList[this.swiperInstance.activeIndex].episodeid,
        })
        playerStore.checkLock()
      }
    }
  }

  getEpisodeNumber(id: string) {
    const idx = playerStore.state.episodeList.findIndex((i) => i.episodeid === id)
    return idx >= 0 ? idx : 0
  }

  getInstance() {
    return this.swiperInstance
  }
  detsory() {
    this.swiperInstance?.destroy()
  }
}

export const swiperManager = new SwiperManager()
