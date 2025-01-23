<template>
  <router-stack>
    <var-style-provider :style-vars="{ '--cell-padding': '16px 12px' }">
      <app-header :title="$t('My Collection')" title-position="left" text-color="var(--font-color)">
        <template #left>
          <app-back />
        </template>
      </app-header>

      <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
        <var-list
          :finished="finished"
          v-model:loading="loading"
          @load="handleLoad"
          :immediate-check="false"
        >
          <var-cell :key="item" v-for="item in list">
            <star-list-item :data="item" @delete="deleteCollection" />
          </var-cell>
        </var-list>
      </var-pull-refresh>
    </var-style-provider>
  </router-stack>
</template>

<script lang="ts" setup>
import StarListItem from '@/components/StarListItem.vue'
import { apiGetCollectionList, CollectVideoType, apiDeleteCollection } from '@/apis/video'

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
  apiGetCollectionList({ page: 1, pagesize: 10 })
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
<style lang="less" scoped></style>
