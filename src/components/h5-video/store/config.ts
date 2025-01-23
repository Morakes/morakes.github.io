import { EpisodeDetailType, TVInfo } from '@/apis/video'
import { LOCK_STATUS } from '@/constant/common'

export const defaultEpisodeDetail: EpisodeDetailType = {
  episodeid: '',
  lockStatus: LOCK_STATUS.LOCKED,
  episodeNumber: 0,
  episodeTitle: '',
  chargeCoin: 0,
  linkInfo: [],
}

export const defaultVideoInfo: TVInfo = {
  cover: '',
  summary: '',
  source: 0,
  videoid: '',
  episodeidList: [],
  lastEpisodeid: '',
  lastWatchTime: 0,
  lastWatchPosition: 0,
  likeCount: 0,
  commentCount: 0,
  shareCount: 0,
  collectCount: 0,
  isLike: false,
  isCollect: false,
  videoName: '',
  videoAliasName: '',
  areaCode: 0,
  totalDuration: 0,
  showType: 0,
  totalEpisodeNum: 0,
  firstEpisodeid: '',
  latestEpisodeid: '',
  latestEpisodeTitle: '',
  episodeLatestUpdateTime: 0,
  shelfTime: 0,
  isFree: 0,
  languageType: 0,
  isEnd: 0 as const,
  tagInfo: [],
}
