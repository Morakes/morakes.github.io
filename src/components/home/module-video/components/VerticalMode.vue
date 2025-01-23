<template>
  <custom-skeleton :loading="loading" avatar :rows="3">
    <template v-for="video in list" :key="video.videoId">
      <div class="block flex gap-[10px] mb-[10px] px-[10px]" @click="handleGoTo(video.videoid)">
        <cover-image v-bind="coverProps" :cover="video.cover" :detail="video.totalEpisodeNum" />
        <var-space direction="column" size="4px" class="mt-1 relative w-full">
          <var-ellipsis :tooltip="false" line-clamp="2" class="text-md text-[var(--font-color)]">
            {{ video?.videoName }}
          </var-ellipsis>
          <var-ellipsis
            :tooltip="false"
            line-clamp="4"
            class="text-xs mt-2 text-[var(--font-secondary-color)]"
          >
            {{ video?.summary }}
          </var-ellipsis>
          <div class="text-xs absolute bottom-1 text-[var(--font-secondary-color)]">
            {{ arrayWrap(video?.tagInfo).join(' ') }}
          </div>
        </var-space>
      </div>
    </template>
  </custom-skeleton>
</template>

<script lang="ts" setup>
import { VideoListType } from '@/apis/home'
import CoverImage, { Props as CoverImageProps } from '../../CoverImage.vue'
import { arrayWrap } from '@/utils/common'

interface Props {
  // 封面属性
  coverProps: Partial<CoverImageProps>
  list: VideoListType[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
})
const emits = defineEmits<{
  (e: 'go-to', videoId: string): void
}>()

const loading = ref(true)
const handleGoTo = (videoId: string) => {
  emits('go-to', videoId)
}

watch(
  () => props.list,
  () => {
    if (!props.list.length) return

    setTimeout(() => {
      loading.value = false
    }, 300)
  },
  {
    immediate: true,
  }
)
</script>
<style lang="less" scoped></style>
