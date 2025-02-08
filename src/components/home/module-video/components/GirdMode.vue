<template>
  <custom-skeleton :loading="loading" avatar :rows="3">
    <var-row :gutter="[12, 10]" class="px-[10px]">
      <template v-for="item in list" :key="item">
        <var-col :span="colSpan" direction="column">
          <cover-image
            :cover="item.cover"
            :badge="'New'"
            :detail="item.totalEpisodeNum"
            v-bind="coverProps"
            @click="handleGoTo(item)"
          />
          <var-space direction="column" size="4px" class="mt-1">
            <var-ellipsis :tooltip="true" line-clamp="2" class="text-md text-[var(--font-color)]">
              {{ item.videoName }}
            </var-ellipsis>
          </var-space>
        </var-col>
      </template>
    </var-row>
  </custom-skeleton>
</template>
<script lang="ts" setup>
import { VideoListType } from '@/apis/home'
import CoverImage, { Props as CoverImageProps } from '../../CoverImage.vue'

interface Props {
  list: VideoListType[]
  colSpan?: number
  coverProps?: Partial<CoverImageProps>
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'go-to', data: VideoListType): void
}>()

const loading = ref(true)
const handleGoTo = (data: VideoListType) => {
  emits('go-to', data)
}

watch(
  () => props.list,
  () => {
    if (!props.list.length) return

    window.setTimeout(() => {
      loading.value = false
    }, 300)
  },
  {
    immediate: true,
  }
)
</script>
<style lang="less" scoped></style>
