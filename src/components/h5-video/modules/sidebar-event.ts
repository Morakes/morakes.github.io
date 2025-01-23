import { apiCollectionVideo, apiDeleteCollection, apiToggleLikeVideo } from '@/apis/video'
import { playerStore } from '../store/index'
import { useOn, EVENT_KEY } from '@/components/h5-video/hooks/useMitt'

export class SidebarEvent {
  events: { event: EVENT_KEY; handler: (...args: any[]) => void }[]
  constructor() {
    this.events = [
      {
        event: EVENT_KEY.COLLECT_CLICK,
        handler: this.toggleCollectHandler.bind(this),
      },
      {
        event: EVENT_KEY.HEART_CLICK,
        handler: this.toggleLikeHandler.bind(this),
      },
    ]

    this.subscribe()
  }
  subscribe() {
    this.events.forEach((item) => {
      useOn(item.event, item.handler)
    })
  }

  toggleLikeHandler() {
    if (playerStore.state.videoInfo?.isLike) {
      // 取消点赞
      this._toggleLikeHandler(playerStore.state.videoInfo!.videoid, 2)
      playerStore.updateStore({
        videoInfo: {
          ...playerStore.state.videoInfo,
          isLike: false,
          likeCount: playerStore.state.videoInfo!.likeCount - 1,
        },
      })
    } else {
      // 点赞
      this._toggleLikeHandler(playerStore.state.videoInfo!.videoid, 1)
      playerStore.updateStore({
        videoInfo: {
          ...playerStore.state.videoInfo,
          isLike: true,
          likeCount: playerStore.state.videoInfo!.likeCount + 1,
        },
      })
    }
  }

  /**
   *  toggle点赞
   * @param data
   * @param videoid 视频id
   * @param type 1点赞 2取消点赞
   */
  async _toggleLikeHandler(videoid: string, type: 1 | 2) {
    try {
      await apiToggleLikeVideo({ videoid, cType: type })
    } catch (error) {
      console.log('失败', error)
    }
  }

  toggleCollectHandler() {
    if (playerStore.state.videoInfo.isCollect) {
      this._unCollectHandler(playerStore.state.videoInfo.videoid)
      playerStore.updateStore({
        videoInfo: {
          ...playerStore.state.videoInfo,
          collectCount: playerStore.state.videoInfo.collectCount - 1,
          isCollect: !playerStore.state.videoInfo.isCollect,
        },
      })
    } else {
      this._collectHandler(playerStore.state.videoInfo.videoid)
      playerStore.updateStore({
        videoInfo: {
          ...playerStore.state.videoInfo,
          collectCount: playerStore.state.videoInfo.collectCount + 1,
          isCollect: !playerStore.state.videoInfo.isCollect,
        },
      })
    }
  }

  async _collectHandler(videoid: string) {
    try {
      await apiCollectionVideo({ videoid })
    } catch (error) {
      console.log('收藏失败', error)
    }
  }
  async _unCollectHandler(videoid: string) {
    try {
      await apiDeleteCollection({ ids: [videoid], isAllDel: 0 })
    } catch (error) {
      console.log('取消收藏失败', error)
    }
  }
}
