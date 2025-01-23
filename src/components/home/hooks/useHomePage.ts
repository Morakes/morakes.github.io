import {
  apiGetNavigation,
  NavigationType,
  apiGetHomeData,
  HomeDataType,
  HistoryListType,
  apiGetWatchHistory,
} from '@/apis/home'

export const useHomePage = () => {
  const tabList = ref<NavigationType[]>([])
  const activeTab = ref<string>('')

  const bannerMaterial = ref<HomeDataType['banner']>([])
  const moduleVideoMaterial = ref<HomeDataType['moduleVideo']>([])

  const historyList = ref<HistoryListType[]>([])

  // 获取导航栏
  const fetchNavigation = async () => {
    const res = await apiGetNavigation()
    tabList.value = res.data
    activeTab.value = tabList.value[0]?.navid
  }

  // 获取视频模块
  const fetchHomeData = async (navid: string) => {
    const res = await apiGetHomeData(navid)
    const { banner, moduleVideo } = res.data
    bannerMaterial.value = banner
    moduleVideoMaterial.value = moduleVideo
  }

  const fetchWatchHistory = async () => {
    const res = await apiGetWatchHistory({
      page: 1,
      pagesize: 10,
    })
    historyList.value = res.data.list.map((i) => ({
      ...i,
      videoName: i.videoName,
      totalEpisodeNum: i.episodeNumber,
      cover: i.cover,
    }))
  }

  watch(
    () => activeTab.value,
    async () => {
      await fetchHomeData(activeTab.value!)
    }
  )

  onMounted(async () => {
    fetchNavigation()
    fetchWatchHistory()
  })

  return {
    tabList,
    activeTab,
    bannerMaterial,
    moduleVideoMaterial,
    historyList,
  }
}
