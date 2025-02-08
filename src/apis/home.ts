import { request } from '@/request'

export type NavigationType = {
  navid: string
  stor: number
  config: string
  navName: string
}

/**
 * 获取导航
 * @returns NavigationType[]
 */
export const apiGetNavigation = async () => {
  return request.get<Res<NavigationType[]>>('/h5/v1/navigation', {})
}

export interface HomeDataType {
  banner: {
    bannerImg: string
    redirectConfig: RedirectConfigType
    sort: number
  }[]
  moduleVideo: ModuleVideoType[]
}

export interface ModuleVideoType {
  moduleName: string
  moduleType: number
  moduleid: string
  sort: number
  videoList: VideoListType[]
}

export interface RedirectConfigType {
  id: string
  path: string
  type: number
  videoInfo: {
    isFree: number
    videoName: string
    releaseDate: string
    tagInfo: string[]
  }
}

export interface VideoListType {
  videoid: string
  cover: string
  summary: string
  label: string
  tagInfo: string[]
  releaseDate: string
  videoName: string
  videoAliasName: string
  totalDuration: number
  showType: number
  totalEpisodeNum: number
  firstEpisodeid: string
  latestEpisodeid: string
  latestEpisodeNumber: number
  latestEpisodeTitle: string
  episodeLatestUpdateTime: number
  shelfTime: number
  isFree: number
  isEnd: number
}

/**
 * 获取首页视频模块
 * @param navid
 * @returns HomeDataType
 */
export const apiGetHomeData = async (navid: string) => {
  return request.get<Res<HomeDataType>>('/h5/v1/index', {
    navid,
  })
}

/**
 * 获取热搜
 * @returns VideoListType[]
 */
export const apiGetHotSearch = async () => {
  return request.get<Res<VideoListType[]>>('/h5/v1/hotsearch').send(true)
}

export interface HistoryListType {
  id: string
  videoid: string
  videoName: string
  videoAliasName: string
  cover: string
  episodeNumber: number
  episodeTitle: string
  episodeIntro: string
  chargeCoin: number
  lastEpisodeDuration: number
  watchTime: number
  lastEpisodeid: string
  lastWatchPosition: number
}
/**
 * 获取观看记录
 * @returns HistoryListType[]
 */
export const apiGetWatchHistory = (data: Page) => {
  return request
    .get<Res<{ list: HistoryListType[]; total: number }>>('/h5/v1/watched/list', data)
    .send(true)
}

/**
 * 搜索视频
 * @param data
 * @returns
 */
export const apiSearchVideo = (data: { keyword: string } & Page) => {
  return request.post<Res<{ list: VideoListType[] }>>('/h5/v1/search', data)
}
