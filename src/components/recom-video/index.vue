<template>
  <label class="mt-[16px] block text-xl color-white">{{ title }}</label>
  <recom-list
    class="mt-[10px]"
    :col-span="8"
    :list="recommanderVideo"
    :cover-props="{ height: '150px', badgePosi: 'right' }"
    @select="handleSelected"
  />
</template>

<script lang="ts" setup>
import { TVInfo, apiGetYouMightLike } from '@/apis/video'
import RecomList from './components/RecomList.vue'
import { useAppRouter } from '@/use'

interface Props {
  videoId: string
  title: string
}
const { router, route } = useAppRouter()
const props = defineProps<Props>()
const recommanderVideo = ref<TVInfo[]>([])

const fetchData = () => {
  apiGetYouMightLike({ videoid: props.videoId }).then((res) => {
    recommanderVideo.value = Array.isArray(res.data) ? res.data : []
  })
}

const handleSelected = (item: TVInfo) => {
  router.push({
    path: route.path,
    query: {
      videoId: item.videoid,
      episodeId: item.firstEpisodeid,
    },
  })
}

watch(
  () => props.videoId,
  () => {
    if (props.videoId) {
      fetchData()
    }
  },
  {
    immediate: true,
  }
)
</script>
<style lang="less" scoped></style>
