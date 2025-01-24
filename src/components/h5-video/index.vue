<template>
  <div id="teleport-target">
    <swiper
      direction="vertical"
      :virtual="true"
      :modules="[Virtual]"
      :slides-per-view="1"
      :allow-slide-next="swiperManager.canSlideNext()"
      :allow-slide-prev="swiperManager.canSlidePrev()"
      :momentum="true"
      :momentum-bounce="false"
      @init="handleInit"
      :touch-move-stop-propagation="true"
    >
      <swiper-slide
        class="swiper-slide"
        v-for="item in episodeList"
        :key="item.episodeid"
        :virtual-index="item.episodeid"
        :id="`episode-${item.episodeid}`"
      >
        <!-- 视频播放器 -->
        <template v-if="item.episodeid === currentEpisode?.episodeid && !isLockedEpisode">
          <video-player />
        </template>

        <!-- 封面 -->
        <img :src="videoInfo?.cover" class="video-poster" />
        <!-- 未付费解锁 -->
        <unlock-mask v-if="isLockedEpisode" />

        <!-- 底部抽屉 -->
        <episode-bar />
      </swiper-slide>

      <!-- 浮动面板 ps：后续其他页面可能复用 参数传递方式 -->
      <video-float-panel
        v-model:videoInfo="videoInfo"
        :episode-list="episodeList"
        :current-episode="currentEpisode"
        :teleport="teleport"
        :anchor="floatingPanelAnchor"
      />

      <comments-drawer
        :comment-count="currentEpisode?.commentCount"
        :episodeId="currentEpisode?.episodeid"
        :videoId="videoInfo.videoid"
        :playTime="playTime"
      />
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Swiper as SwiperType } from 'swiper/types'
import { Virtual } from 'swiper/modules'
import 'swiper/css'
import VideoPlayer from './components/video-player/VideoPlayer.vue'
import CommentsDrawer from './components/comments-drawer/CommentsDrawer.vue'
import { playerStore } from './store/index'
import { swiperManager } from './swiper-manager'

const teleport = ref()
const { episodeList, videoInfo, isLockedEpisode, currentEpisode, floatingPanelAnchor, playTime } =
  toRefs(playerStore.state)

function handleInit(swiper: SwiperType) {
  swiperManager.init(swiper)
}

onMounted(() => {
  nextTick(() => {
    teleport.value = document.querySelector('#teleport-target')
  })
})

onUnmounted(() => {
  swiperManager.detsory()
})
</script>
<style lang="less" scoped>
.swiper {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--bg-black-color);
  height: var(--app-height);
}
.swiper-slide {
  position: relative;
  width: 100vw;
  height: inherit;
}
.video-poster {
  position: absolute;
  top: 0;
  bottom: 0;
  object-fit: cover;
  z-index: 1;
  height: calc(100vh - 60px);
  width: 100%;
}
</style>
