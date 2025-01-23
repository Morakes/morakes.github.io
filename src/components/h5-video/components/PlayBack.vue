<template>
  <div
    class="absolute z-100 top-[15px] px-[10px] w-full flex justify-between items-center text-[var(--dark-font-color)]"
  >
    <var-space align="center">
      <var-icon name="chevron-left" :size="35" @click="goBack" />
      {{ $t('ep_num', [playerStore.state.currentEpisode?.episodeNumber]) }}
    </var-space>
    <var-space :size="20">
      <var-space align="center" :size="5" @click="isShowRate = true">
        <var-image src="@/assets/images/speed.png" height="20" width="20" /> {{ $t('speed') }}
      </var-space>
      <var-icon name="dots-vertical" @click="isShowConfig = true" />
    </var-space>

    <play-rate-popup v-model:show="isShowRate" />
    <play-config-popup v-model:show="isShowConfig" />
  </div>
</template>
<script lang="ts" setup>
import { useAppRouter } from '@/use'
import { playerStore } from '../store/index'
import PlayRatePopup from './PlayRatePopup.vue'
const { pushParentRoute } = useAppRouter()

const isShowRate = ref(false)
const isShowConfig = ref(false)

function goBack() {
  pushParentRoute()
}
</script>
<style lang="less" scoped></style>
