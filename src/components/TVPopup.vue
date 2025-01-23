<template>
  <var-popup position="bottom" v-bind="$attrs" :overlay="false" :close-on-click-overlay="true">
    <div class="page-wrap">
      <!-- 顶部封面 -->
      <div class="mt-4 flex gap-4 relative">
        <var-image :src="tvInfo?.cover" height="125" width="100" radius="12px" class="shrink-0" />
        <div>
          <div class="text-lg">{{ tvInfo?.videoName }}</div>
          <div class="text-sm mt-2 color-[--font-secondary-color]">
            {{
              `${!!tvInfo?.isEnd ? 'Compelete' : 'No-Compelete'} · ${tvInfo?.totalEpisodeNum} Eps`
            }}
          </div>
        </div>
      </div>

      <!-- 描述 -->
      <var-space class="mt-[16px]">
        <span>Description</span>
        <span>Episodes</span>
      </var-space>
      <div>
        <div class="color-[var(--font-secondary-color)] text-md mt-[16px]">
          <var-ellipsis :line-clamp="3" :tooltip="false" class="relative" expand-trigger="click">
            {{ tvInfo?.summary }}
          </var-ellipsis>
        </div>

        <!-- tag-info -->
        <var-space class="mt-[16px]">
          <var-chip v-for="item in tvInfo?.tagInfo" :key="item" size="small">
            {{ item }}
          </var-chip>
        </var-space>
      </div>
    </div>
  </var-popup>
  <!-- Episodes popup -->
</template>

<script lang="ts" setup>
import { apiGetVideoInfo, TVInfo } from '@/apis/video'

const tvInfo = ref<TVInfo>()
const activeTab = ref('')

onMounted(() => {
  apiGetVideoInfo({ videoid: 'gZDq9a' }).then((res) => {
    tvInfo.value = res.data
  })
})
</script>

<style lang="less" scoped>
.page-wrap {
  padding: 0 16px;
  background-color: #22272e;
  min-height: 90vh;
}
</style>
