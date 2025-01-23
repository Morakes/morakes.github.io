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

// 初始化缓存数据
PlayerStoreController.initial()
const { route } = useAppRouter()

function initPlayerStore() {
  const { videoId, episodeId } = route.query
  if (!videoId) {
    return
  }

  playerStore.init({
    videoId: videoId as string,
    episodeId: episodeId as string,
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
