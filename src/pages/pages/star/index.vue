<template>
  <div class="root">
    <var-style-provider>
      <app-header :title="$t('my_favorite')" title-position="left"> </app-header>
    </var-style-provider>

    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <var-list
        :finished="finished"
        v-model:loading="loading"
        @load="handleLoad"
        :immediate-check="false"
        class="min-h-xl"
      >
        <var-cell :key="item.videoid" v-for="item in list">
          <star-list-item :data="item" @delete="deleteCollection" />
        </var-cell>
      </var-list>
    </var-pull-refresh>

    <router-stack-view />
  </div>
</template>

<script setup lang="ts">
import StarListItem from '@/components/StarListItem.vue'
import { apiDeleteCollection, apiGetCollectionList, CollectVideoType } from '@/apis/video'

const isRefresh = ref(false)
const finished = ref(false)
const loading = ref(false)
const list = ref<CollectVideoType[]>([])
const page = reactive({
  page: 1,
  pagesize: 10,
  total: 0,
})

function handleRefresh() {
  isRefresh.value = true
  page.page = 1
  list.value = []
  fetchData()
}
const fetchData = () => {
  apiGetCollectionList({ page: page.page, pagesize: page.pagesize })
    .then((res) => {
      list.value = list.value.concat(res.data.list || [])
      page.total = res.data.total
    })
    .finally(() => {
      // 如果在刷新 则关闭刷新状态
      if (isRefresh.value) {
        isRefresh.value = false
        finished.value = false
      }

      loading.value = false
      if (list.value?.length >= page.total) {
        finished.value = true
      }
    })
}

const handleLoad = () => {
  loading.value = true
  page.page++
  fetchData()
}

const filterVideo = (videoId: string) => {
  list.value = list.value.filter((item) => item.videoid !== videoId)
}

const deleteCollection = (e: CollectVideoType) => {
  apiDeleteCollection({ ids: [e.videoid], isAllDel: 0 }).then(() => {
    filterVideo(e.videoid)
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped>
.root {
  --collapse-header-padding: 0 20px;
  background-color: var(--bg-color);
  min-height: 100vh;
}
</style>

<route lang="json">
{
  "meta": {
    "stacks": [
      {
        "name": "player",
        "children": ["tv-intro"]
      }
    ]
  }
}
</route>
