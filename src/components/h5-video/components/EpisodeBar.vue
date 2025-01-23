<template>
  <div class="ctrl-bar">
    <var-space align="center" justify="center" class="pt-10px text-[var(--dark-font-color)]">
      <div class="chip" @click="setShowPanel">
        <var-space justify="space-between">
          <var-image src="@/assets/images/photo.png" />
          <span>{{ `${videoInfo.totalEpisodeNum} ${$t('episode')} · ${$t('select_ep')}` }}</span>
        </var-space>
        <div class="ml-auto">
          <var-icon name="chevron-up" />
        </div>
      </div>
      <var-image
        :src="!isFullScreen ? ScreenIcon : ExitScreenIcon"
        @click="handleToggleFullScreen"
      />
    </var-space>
  </div>
</template>
<script lang="ts" setup>
import ScreenIcon from '@/assets/images/screen.png'
import ExitScreenIcon from '@/assets/images/screen-exit.png'
import { playerStore } from '../store/index'
import { EVENT_KEY, useEmit } from '../hooks/useMitt'

const { videoInfo, isFullScreen } = toRefs(playerStore.state)
function handleToggleFullScreen() {
  playerStore.updateStore({
    isFullScreen: !playerStore.state.isFullScreen,
  })
}

function setShowPanel() {
  useEmit(EVENT_KEY.SET_FLOATING_PANEL, window.innerHeight * 0.45)
}
</script>
<style lang="less" scoped>
.ctrl-bar {
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  z-index: 2;
  background-color: var(--bg-black-color);
  .chip {
    width: 310px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 0 10px;
  }
}
</style>
