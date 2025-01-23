import { EpisodeDetailType, EpisodeType, TVInfo } from '@/apis/video'

export interface StateType {
  episodeId: string
  videoId: string
  videoInfo: TVInfo
  episodeList: EpisodeType[]
  currentEpisode: EpisodeType | undefined
  episodeDetail: EpisodeDetailType
  playRate: number
  floatingPanelAnchor: number
  isShowComment: boolean
  isFullScreen: boolean
  isLockedEpisode: boolean
  playTime: number
}
