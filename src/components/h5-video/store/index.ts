import { reactive } from 'vue'
import { apiGetEpisodeDetail, apiGetEpisodeInfo, apiGetVideoInfo, EpisodeType } from '@/apis/video'
import { LOCK_STATUS } from '@/constant/common'
import { defaultEpisodeDetail, defaultVideoInfo } from './config'
import { StateType } from './type'
import { useAppRouter } from '@/use'
import { EVENT_KEY, useEmit } from '../hooks/useMitt'
import { sessionStorage } from '@/utils/storage'

// 实例存储
let playerStore: ReturnType<typeof createPlayerStore>

function createPlayerStore() {
  const { route } = useAppRouter()

  const state = reactive<StateType>({
    /** 视频ID */
    videoId: '',
    /** 剧集ID */
    episodeId: '',
    /** 视频信息 */
    videoInfo: defaultVideoInfo,
    /** 剧集列表 */
    episodeList: [] as EpisodeType[],
    /** 当前播放的剧集信息，不包含链接 */
    currentEpisode: undefined,
    /** 当前播放的剧集信息,包含链接linkinfo */
    episodeDetail: defaultEpisodeDetail,
    /** 评论 */
    isShowComment: false,
    /** 全屏 */
    isFullScreen: false,
    /** 播放速度 */
    playRate: 1,
    /** 剧集是否锁住 */
    isLockedEpisode: false,
    /** floating面板 */
    floatingPanelAnchor: 0,
    /** 播放进度 */
    playTime: 0,
  })

  // 监听剧集变化 更新currentEposide
  watchEffect(() => {
    if (!state.episodeList.length || !state.episodeId) return
    // 等待数据初始化之后 更新currentEpisode

    updateStore({
      currentEpisode: getCurrentEpisode(state.episodeId),
    })
  })

  watchEffect(async () => {
    if (state.videoId && route.query.videoId && state.videoId !== route.query.videoId) {
      await init({
        videoId: route.query.videoId as string,
        episodeId: route.query.episodeId as string,
      })
      // 确保数据存在后 触发 切换选剧/选集 事件
      nextTick(() => {
        useEmit(EVENT_KEY.SELECT_EPISODE, { episodeId: route.query.episodeId as string })
      })
    }
  })

  /** 更新状态函数 */
  function updateStore(updates: Partial<typeof state>) {
    Object.assign(state, updates)
  }

  /**
   * 初始化数据
   * @param param
   */

  async function init({ videoId, episodeId }: { videoId: string; episodeId?: string }) {
    await _fetchVideoList(videoId)
    await _fetchEpisodeList(videoId)
    if (state.episodeList.length > 0) {
      updateStore({
        videoId,
        episodeId: episodeId || state.episodeList[0].episodeid,
      })
      checkLock()
    }
  }

  /**
   * 获取当前episode详情
   * @param episodeid
   * @returns
   */
  async function getEpisodeDetail(episodeid: string = state.episodeId) {
    try {
      const res = await apiGetEpisodeDetail({ episodeid, videoid: state.videoInfo.videoid })
      updateStore({ episodeDetail: res.data })
      return state.episodeDetail
    } catch (error) {
      console.log(error)
    }
  }

  async function _fetchVideoList(videoid: string) {
    const res = await apiGetVideoInfo({ videoid })
    updateStore({ videoInfo: res.data })
    return res.data
  }

  async function _fetchEpisodeList(videoid: string) {
    const res = await apiGetEpisodeInfo({ videoid })
    updateStore({ episodeList: res.data })
    return res.data
  }

  function getEpisodeNumber(id: string) {
    const idx = state.episodeList.findIndex((i) => i.episodeid === id)
    return idx >= 0 ? idx : 0
  }

  function getCurrentEpisode(id: string) {
    return state.episodeList[getEpisodeNumber(id)]
  }

  /** 检查是否解锁 */
  function checkLock() {
    if (getCurrentEpisode(state.episodeId)) {
      updateStore({
        isLockedEpisode: getCurrentEpisode(state.episodeId).lockStatus === LOCK_STATUS.LOCKED,
      })
    } else {
      updateStore({ isLockedEpisode: false })
    }
    return state.isLockedEpisode
  }

  /**
   * 缓存观看记录
   */
  function cacheWatchedRecord() {
    const watchedRecord = sessionStorage.get('watched_record') || {}

    sessionStorage.set(
      'watched_record',
      Object.assign(watchedRecord, {
        [playerStore.state.videoId]: {
          videoId: playerStore.state.videoId,
          episodeId: playerStore.state.episodeId,
        },
      })
    )
  }

  return {
    state,
    updateStore,
    init,
    getEpisodeDetail,
    checkLock,
    getEpisodeNumber,
    cacheWatchedRecord,
  }
}

class PlayerStoreController {
  static initial() {
    /** 初始化playerStore */
    playerStore = createPlayerStore()
  }
  static destory() {
    /** 销毁playerStore 避免内存占用 */
    // @ts-expect-error
    playerStore = null
  }
}

export { playerStore, PlayerStoreController }
