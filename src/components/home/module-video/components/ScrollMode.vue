<template>
  <custom-skeleton :loading="loading" card>
    <div
      class="relative px-[10px] flex gap-[10px] overflow-scroll w-[100vw]"
      style="-webkit-overflow-scrolling: touch"
    >
      <template v-for="video in list" :key="video">
        <div
          class="block shrink-0 flex-nowrap"
          :style="{ flexBasis: basisWidth }"
          @click="handleGoTo(video.videoid)"
        >
          <cover-image
            :badge="'news'"
            :detail="video.totalEpisodeNum"
            :cover="video.cover"
            v-bind="coverProps"
          />
          <var-space direction="column" size="4px" class="mt-1">
            <var-ellipsis :tooltip="false" line-clamp="2" class="text-md text-[var(--font-color)]">
              {{ video.videoName }}
            </var-ellipsis>
          </var-space>
        </div>
      </template>
    </div>
  </custom-skeleton>
</template>
<script lang="ts" setup>
import { VideoListType } from '@/apis/home'
import CoverImage, { Props as CoverImageProps } from '../../CoverImage.vue'

interface Props {
  // 封面属性
  coverProps?: Partial<CoverImageProps>
  list: VideoListType[]
  basisWidth?: string
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
