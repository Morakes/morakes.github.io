<template>
  <cell-template :title="$t('Popular Searches')" class="mt-[20px]" />
  <custom-skeleton :loading="loading" title avatar :rows="3">
    <div class="px-[10px]">
      <var-space direction="column" :size="10">
        <template v-for="(video, index) in list" :key="index">
          <var-row align="center">
            <var-col :span="5">
              <cover-image
                :cover="video.cover"
                :badge="index + 1"
                badge-posi="left"
                width="66px"
                height="99px"
              />
            </var-col>
            <var-col :span="16">
              <var-space direction="column" size="10">
                <var-ellipsis :line-clamp="1" :tooltip="false" class="text-[var(--font-color)]">
                  {{ video.videoName }}
                </var-ellipsis>
                <var-ellipsis
                  :line-clamp="2"
                  :tooltip="false"
                  class="text-xs text-[--font-secondary-color]"
                >
                  {{ video.summary }}
                </var-ellipsis>
              </var-space>
            </var-col>
            <var-col offset="1" :span="2">
              <var-image :src="BtnPlayer" width="24" height="24" />
            </var-col>
          </var-row>
        </template>
      </var-space>
    </div>
  </custom-skeleton>
</template>

<script lang="ts" setup>
import CoverImage from './CoverImage.vue'
import BtnPlayer from '@/assets/images/btn-player.png'
import { apiGetHotSearch, VideoListType } from '@/apis/home'

const loading = ref(true)
const list = ref<VideoListType[]>([])

const fetchData = async () => {
  const res = await apiGetHotSearch()
  list.value = res.data

  setTimeout(() => {
    loading.value = false
  }, 300)
}

onMounted(async () => {
  await fetchData()
})
</script>
<style lang="less" scoped></style>
