<template>
  <router-stack>
    <var-style-provider :style-vars="{ '--cell-padding': '16px 12px' }">
      <app-header text-color="var(--font-color)">
        <template #left>
          <app-back />
          {{ $t('Watch History') }}
        </template>
      </app-header>

      <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh" class="min-h-[100px]">
        <var-list @load="load" :immediate-check="false" :finished="finished" :loading="loading">
          <var-cell :key="item" v-for="item in list" @click="handleGo(item.videoid)">
            <div class="flex gap-5">
              <var-image
                :src="item.cover"
                radius="4"
                width="80px"
                height="100px"
                fit="cover"
                class="shrink-0"
              />
              <div>
                <div>
                  <var-ellipsis
                    :tooltip="false"
                    :line-clamp="3"
                    class="text-md text-[var(--font-color)]"
                  >
                    {{ item.videoName }}
                  </var-ellipsis>
                </div>
                <div>
                  <var-ellipsis
                    :tooltip="false"
                    :line-clamp="1"
                    style="max-width: 200px"
                    class="text-xs mt-[8px] text-[var(--font-secondary-color)]"
                  >
                    {{ $t('ep_update_num', { num: item.latestEpisodeNumber }) }}
                  </var-ellipsis>
                </div>
              </div>
            </div>
          </var-cell>
        </var-list>
      </var-pull-refresh>
    </var-style-provider>
  </router-stack>
</template>
<script lang="ts" setup>
import { apiGetWatchHistory, HistoryListType } from '@/apis/home'
import { useAppRouter } from '@/use'

const { pushStack } = useAppRouter()

const list = ref<HistoryListType[]>([])
const isRefresh = ref(false)
const finished = ref(false)
const loading = ref(false)
const page = reactive({
  page: 1,
  pagesize: 10,
  total: 0,
})

function handleRefresh() {
  isRefresh.value = true
  page.page = 1
  list.value = []
  fetchWatchHistory()
}

const fetchWatchHistory = async () => {
  const res = await apiGetWatchHistory({
    page: page.page,
    pagesize: page.pagesize,
  })
  list.value = list.value.concat(
    res.data.list.map((i) => ({
      ...i,
      videoName: i.videoName,
      totalEpisodeNum: i.episodeNumber,
      cover: i.cover,
    }))
  )
  page.total = res.data.total

  if (isRefresh.value) {
    isRefresh.value = false
    finished.value = false
  }
  loading.value = false
  if (list.value?.length >= page.total) {
    finished.value = true
  }
}

const load = () => {
  loading.value = true
  page.page++
  fetchWatchHistory()
}

const handleGo = (id: string) => {
  pushStack('player', {
    videoId: id,
  })
}

onMounted(() => {
  fetchWatchHistory()
})
</script>
<style lang="less" scoped></style>
