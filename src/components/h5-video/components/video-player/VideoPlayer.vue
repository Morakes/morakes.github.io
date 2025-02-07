<template>
  <div class="video-container">
    <div id="panda-tv-player"></div>

    <div v-show="!playerStore.state.isFullScreen">
      <!-- 右侧互动按钮栏 -->
      <side-tools />
      <!-- 播放器 返回按钮&&设置按钮 -->
      <play-back />
      <!-- 剧集介绍 -->
      <author-intro />

      <!-- 横板 -->
      <!-- <var-image
      :src="ViewScreenBtn"
      class="absolute top-[80%] left-[50%] translate-x-[-50%]"
      width="150px"
      height="auto"
      @click="playerController.reverse()"
      /> -->
    </div>

    <var-loading
      v-show="playerController.loading.value"
      :radius="30"
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
      "
    />

    <!-- 播放按钮 -->
    <var-image
      src="@/assets/images/play-btn.png"
      v-show="!playerController.playing.value"
      class="player-btn"
      @click="playerController.setPlay()"
    />
  </div>
</template>
<script lang="ts" setup>
import 'aliyun-aliplayer/build/skins/default/aliplayer-min.css'
import { PlayerController } from './player-controller'
import { playerStore } from '../../store/index'
// import ViewScreenBtn from '@/assets/images/view-screen-btn.png'

const playerController = new PlayerController()

onMounted(async () => {
  nextTick(async () => {
    playerController.init()
  })
})

onUnmounted(() => {
  playerController.destory()
})
</script>
<style lang="less" scoped>
.video-container {
  position: relative;
  width: 100%;
  flex: 1;
  height: calc(var(--app-height) - 60px);
  background-color: var(--bg-black-color);
  z-index: 2;
  :deep(.prism-player .prism-progress-hover) {
    height: 1vmin !important;
  }
  // 修改进度条颜色
  :deep(.prism-player .prism-progress .prism-progress-played) {
    background-color: #ffa327 !important;
  }
}
.player-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
