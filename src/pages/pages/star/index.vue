<template>
  <var-style-provider
    class="pt-[calc(var(--app-bar-height)+1px)]"
    :style-vars="{ '--collapse-header-padding': '0 20px', '--collapse-content-padding': '0 20px' }"
  >
    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <var-app-bar title="我的收藏" />
      <var-list :finished="finished" v-model:loading="loading" @load="load">
        <var-cell :key="item" v-for="item in list">
          {{ item }}
        </var-cell>
      </var-list>
    </var-pull-refresh>
  </var-style-provider>

  <router-stack-view />
</template>

<script setup lang="ts">
const isRefresh = ref(false)

function handleRefresh() {
  isRefresh.value = false
}

const finished = ref(false)

const loading = ref(false)

const load = () => {
  console.log('fetch data')
}

const list = ref([
  {
    lastWatchtime: 23,
    lastWatchPosition: 20,
    videoName: '至尊驸马爷',
    videoAliasName: '至尊驸马爷',
    cover:
      'https://image.quick.bimo8.com/series_image/env_prod/202302/c0d14bc5c1a9e98f7d1f605735e13b36_adup_1677063489143.jpg',
    episodeNumber: 1,
    episodeTitle: '第1集',
    episodeIntro: '这是第1集简介',
    chargeCoin: 0,
    episodeDuration: 91,
    lastEpisodeid: 'lejRej',
    videoid: 'lejRej',
    id: 'vbmOeY',
    latestEpisodeNumber: 40,
    totalEpisodeNum: 80,
  },
])
</script>

<style lang="less" scoped>
.topic {
  --collapse-header-padding: 0 20px;

  &-item {
    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }

    &-child {
      padding: 0 7px;
    }
  }
}
</style>

<route lang="json">
{
  "meta": {
    "stacks": [
      "sign-up",
      "settings",
      {
        "name": "sign-in",
        "children": ["sign-up", "forgot-password"]
      }
    ]
  }
}
</route>
