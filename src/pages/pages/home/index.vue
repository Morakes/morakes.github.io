<template>
  <div class="root">
    <home-swiper
      v-model:active-tab="activeTab!"
      :tab-list="tabList"
      :banner-material="bannerMaterial"
    />

    <module-video
      v-show="tabList.length && tabList[0].navid === activeTab && historyList.length"
      :module-video="[
        {
          moduleName: $t('watch_history'),
          moduleType: MODULE_TYPE.VERTICAL_SCROLL as unknown as number,
          moduleid: 'history',
          videoList: historyList as unknown as VideoListType[],
          sort: 0,
        },
      ]"
    />
    <module-video :module-video="moduleVideoMaterial" />
  </div>
  <router-stack-view />
</template>

<script setup lang="ts">
import { VideoListType } from '@/apis/home'
import { useHomePage } from '@/components/home/hooks/useHomePage'
import ModuleVideo from '@/components/home/module-video/Index.vue'
import { MODULE_TYPE } from '@/components/home/module-video/config'

const { activeTab, tabList, bannerMaterial, moduleVideoMaterial, historyList } = useHomePage()
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100vmin;
  overflow: hidden;
}
</style>

<route lang="json">
{
  "meta": {
    "stacks": [
      "media-search",
      "tv-intro",
      {
        "name": "player",
        "children": ["tv-intro"]
      }
    ]
  }
}
</route>
