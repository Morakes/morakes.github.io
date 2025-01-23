import { LOCK_STATUS } from '@/constant/common'
import { request } from '@/request'

export interface CollectVideoType {
  lastWatchtime: number
  lastWatchPosition: number
  videoName: string
  videoAliasName: string
  cover: string
  episodeNumber: number
  episodeTitle: string
  episodeIntro: string
  chargeCoin: number
  episodeDuration: number
  lastEpisodeid: string
  videoid: string
  id: string
  latestEpisodeNumber: number
  totalEpisodeNum: number
  summary: string
}

/**
 * 获取收藏列表
 * @param data
 * @returns
 */
export const apiGetCollectionList = (data: Page) => {
  return request
    .get<
      Res<{
        list: CollectVideoType[]
        total: number
      }>
    >('/h5/v1/collect/list', data)
    .send(true)
}

/**
 * 收藏视频
 * @param data
 * @returns
 */
export const apiCollectionVideo = (data: { videoid: string }) => {
  return request.post<Res<{ result: boolean }>>('/h5/v1/collect', data)
}

/**
 * 取消收藏视频
 * @param data
 * @param data.ids 取消的视频id
 * @param data.isAllDel 是否取消全部 0否  1是
 * @returns
 */
export const apiDeleteCollection = (data: { ids: string[]; isAllDel: 0 | 1 }) => {
  return request.post<
    Res<{
      result: boolean
    }>
  >('/h5/v1/collect/del', data)
}

/**
 * 取消点赞/点赞
 * @param data
 * @param data.videoId 视频id
 * @param data.type 1点赞 2取消点赞
 * @returns
 */
export const apiToggleLikeVideo = (data: { videoid: string; cType: 1 | 2 }) => {
  return request.post<
    Res<{
      result: boolean
    }>
  >('/h5/v1/video/like', data)
}

export interface TVInfo {
  cover: string
  summary: string
  source: number
  videoid: string
  episodeidList: EpisodeidList[]
  lastEpisodeid: string
  lastWatchTime: number
  lastWatchPosition: number
  likeCount: number
  commentCount: number
  shareCount: number
  collectCount: number
  isLike: boolean
  isCollect: boolean
  videoName: string
  videoAliasName: string
  areaCode: number
  totalDuration: number
  showType: number
  totalEpisodeNum: number
  firstEpisodeid: string
  latestEpisodeid: string
  latestEpisodeTitle: string
  episodeLatestUpdateTime: number
  shelfTime: number
  isFree: number
  languageType: number
  isEnd: 0 | 1
  tagInfo: string[]
}

export interface EpisodeidList {
  episodeid: string
  episodeNumber: number
  episodeTitle: string
  chargeCoin: number
  lockStatus: LOCK_STATUS
}
/**
 * 获取视频详情
 * @param data
 * @returns
 */
export const apiGetVideoInfo = (data: { videoid: string }) => {
  return request.get<Res<TVInfo>>('/h5/v1/video/detail', data)
}

/**
 * 猜你喜欢
 * @param data
 * @param data.videoId 视频hashid
 * @returns TVInfo[]
 */
export const apiGetYouMightLike = (data: { videoid: string }) => {
  return request.get<Res<TVInfo[]>>('/h5/v1/guesslike', data)
}

export interface EpisodeType {
  episodeid: string
  duration: number
  captionLinkInfo: {
    linkUrl: string
    captionName: string
    key: string
  }
  /** 1解锁 0未解锁 */
  lockStatus: LOCK_STATUS
  episodeNumber: number
  episodeTitle: string
  chargeCoin: number
  /** 1上架 2下架 */
  status: 1 | 2
  commentCount: number
}
export const apiGetEpisodeInfo = (data: { videoid: string }) => {
  return request.get<Res<EpisodeType[]>>('/h5/v1/episode_v2', data)
}

// 观看位置上报
export const apiReportVideoPosition = (data: {
  /** 视频hashid */
  videoid: string
  /** 剧集hashid */
  episodeid: string
  /** 观看时长 */
  watchTime: number
  /** 观看位置 */
  watchPosition: number
  /** 触发时间戳 */
  triggerTime: number
}) => {
  return request.post('/h5/v1/watched', data)
}

export interface EpisodeDetailType {
  episodeid: string
  /** 1解锁 0未解锁 */
  lockStatus: LOCK_STATUS
  /** 播放地址列表 */
  linkInfo: {
    linkUrl: string
    source: string
  }[]
  episodeNumber: number
  episodeTitle: string
  /** 收费金币 */
  chargeCoin: number
}

/**
 * 剧集详情
 * @param data
 * @param data.videoid 视频hashid
 * @param data.episodeid 剧集hashid
 * @returns
 */
export const apiGetEpisodeDetail = (data: { videoid: string; episodeid: string }) => {
  return request.get<Res<EpisodeDetailType>>('/h5/v1/episode/detail', data)
}

export interface CommentType {
  id: string
  userid: string
  content: string
  nickName: string
  avatar: string
  selfIsLike: boolean
  likeNum: number
  playTime: number
  createTime: number
  replyCount: number
  /** 是否加精 */
  isFirst: 0 | 1
  type: number
}

/**
 * 获取集评论
 * @param data
 * @returns
 */
export const apiGetCommentList = (data: {
  videoid: string
  episodeid: string
  page: number
  pagesize: number
}) => {
  return request.get<Res<{ list: CommentType[]; total: number; totalPage: number; page: number }>>(
    '/h5/v1/comment/list',
    data
  )
}

export interface ReplyType {
  id: string
  userid: string
  content: string
  replyid: string
  nickName: string
  avatar: string
  selfIsLike: boolean
  replyUserid: string
  likeNum: number
  playTime: number
  createTime: number
}
/**
 * 获取评论的回复列表
 * @param data
 * @returns
 */
export const apiGetReplyList = (data: {
  videoid: string
  episodeid: string
  commentid: string
  page: number
  pagesize: number
}) => {
  return request.get<Res<{ list: ReplyType[]; total: number; totalPage: number; page: number }>>(
    '/h5/v1/reply/list',
    data
  )
}

/**
 * 发布评论
 * @param data
 * @returns
 */
export const apiPublishComment = (data: {
  videoid: string
  episodeid: string
  playTime: number
  content: string
}) => {
  return request.post<Res<{ result: boolean; commentid: string; createTime: number }>>(
    '/h5/v1/comment/store',
    data
  )
}

/**
 * 回复评论
 * @param data
 * @returns
 */
export const apiReplyComment = (data: {
  videoid: string
  episodeid: string
  commentid: string
  replyid: string
  playTime: number
  content: string
}) => {
  return request.post<Res<{ result: boolean; replyid: string; createTime: number }>>(
    '/h5/v1/reply/store',
    data
  )
}

/**
 * 点赞
 * @param data
 * @returns
 */
export function apiThumbsUp(data: { commentid: string; replyid: string }) {
  return request.post<Res<{ result: boolean }>>('/h5/v1/comment/like', data)
}

/**
 * 取消点赞
 * @param data
 * @returns
 */
export function apiThumbsDown(data: { commentid: string; replyid: string }) {
  return request.post<Res<{ result: boolean }>>('/h5/v1/comment/likedel', data)
}

/**
 * 删除回复&评论
 * @param data
 * @returns
 */
export function apiDeleteComment(data: { commentid: string; replyid: string }) {
  return request.post<Res<{ result: boolean }>>('/h5/v1/comment/del', data)
}
