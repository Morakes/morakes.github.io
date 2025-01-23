<template>
  <div class="absolute z-100 bottom-[20px] w-full px-[10px] text-[var(--dark-font-color)]">
    <var-space direction="column">
      <var-space align="center" @click="pushStack('tv-intro', { videoId: videoInfo.videoid })">
        <var-image :src="videoInfo.cover" height="32px" width="24px" radius="5px" />
        <var-ellipsis :tooltip="false" class="max-w-[65vmin]" line-clamp="1">
          {{ videoInfo.videoName }}
        </var-ellipsis>
        <var-icon name="chevron-right" />
      </var-space>
      <var-ellipsis
        :tooltip="false"
        line-clamp="2"
        class="text-[var(--dark-font-secondary-color)] max-w-[80vmin] text-md"
      >
        {{ videoInfo.summary }}
      </var-ellipsis>
    </var-space>
  </div>
</template>
<script lang="ts" setup>
import { playerStore } from '../store/index'
import { useAppRouter } from '@/use'

const { pushStack } = useAppRouter()
const { videoInfo } = toRefs(playerStore.state)
</script>
<style lang="less" scoped></style>
