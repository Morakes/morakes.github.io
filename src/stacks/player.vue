<template>
  <router-stack>
    <div id="root-player">
      <h5-video />
    </div>
  </router-stack>
</template>
<script lang="ts" setup>
import H5Video from '@/components/h5-video/index.vue'
import { useAppRouter } from '@/use'
import { playerStore, PlayerStoreController } from '@/components/h5-video/store/index'
import { customSessionStorage } from '@/utils/storage'

// 初始化缓存数据
PlayerStoreController.initial()
const { route } = useAppRouter()

function getCacheEposide(videoId: string) {
  const watchedRecord = customSessionStorage.get('watched_record') as Record<string, any>
  if (!watchedRecord || !watchedRecord[videoId]) return undefined
  return watchedRecord[videoId].episodeId
}

function initPlayerStore() {
  const { videoId, episodeId } = route.query
  if (!videoId) {
    throw new Error('videoId is required')
  }

  playerStore.init({
    videoId: videoId as string,
    episodeId: episodeId || getCacheEposide(videoId as string),
  })
}

onMounted(() => {
  initPlayerStore()
})

onUnmounted(() => {
  PlayerStoreController.destory()
})
</script>
<style lang="less" scoped></style>
