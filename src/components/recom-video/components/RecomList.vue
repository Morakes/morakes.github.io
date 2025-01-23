<template>
  <custom-skeleton :loading="loading" avatar :rows="3">
    <var-row :gutter="[12, 10]" class="h-[100%]">
      <template v-for="item in list" :key="item">
        <var-col :span="colSpan" direction="column" @click="handleClick(item)">
          <cover-image :cover="item.cover" :detail="item.totalEpisodeNum" v-bind="coverProps">
            <template #badge>
              <var-image :src="StarImg" width="15px" />
            </template>
          </cover-image>
          <var-space direction="column" size="4px" class="mt-1">
            <var-ellipsis
              :tooltip="false"
              line-clamp="2"
              class="text-md text-[var(--dark-font-secondary-color)]"
            >
              {{ item.videoName }}
            </var-ellipsis>
          </var-space>
        </var-col>
      </template>
    </var-row>
  </custom-skeleton>
</template>
<script lang="ts" setup>
import CoverImage, { Props as CoverImageProps } from './Cover.vue'
import StarImg from '@/assets/images/star.png'
import StarActiveImg from '@/assets/images/star--active.png'
import { TVInfo } from '@/apis/video'

interface Props {
  list: TVInfo[]
  colSpan?: number
  coverProps?: Partial<CoverImageProps>
}

const props = defineProps<Props>()
const loading = ref(true)

const emits = defineEmits<{
  (e: 'select', val: TVInfo): void
}>()

watch(
  () => props.list,
  () => {
    setTimeout(() => {
      loading.value = false
    }, 300)
  },
  {
    immediate: true,
  }
)

function handleClick(item: TVInfo) {
  emits('select', toRaw(item))
}
</script>
<style lang="less" scoped></style>
