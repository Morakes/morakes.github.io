<template>
  <router-stack>
    <div class="pt-[var(--app-bar-height)] pb-[var(--bottom-navigation-height)]">
      <var-style-provider
        :style-vars="{
          '--field-decorator-line-size': '0px',
          '--field-decorator-line-focus-size': '0px',
          '--field-decorator-placeholder-size': 'text-md',
        }"
      >
        <var-space class="w-full" :size="5">
          <app-back />
          <var-input
            variant="outlined"
            placeholder="Please Enter Keywords To Search"
            v-model="searchInput"
            size="small"
            clearable
            class="w-[320px] bg-[var(--bg-layer-2)] rounded-[4px]"
            @change="handleSearch"
            @input="handleSearch"
            @blur="handleAddHistory"
            @clear="resetSearch"
          >
            <template #prepend-icon>
              <var-icon class="prepend-icon" name="magnify" />
            </template>
          </var-input>
        </var-space>

        <div v-show="!isLoading && !searchData.length">
          <history-search :setInput="setInput" />
          <popular-search />
        </div>

        <div v-show="!(!isLoading && !searchData.length)">
          <search-result />
        </div>
      </var-style-provider>
    </div>
  </router-stack>
</template>
<script lang="ts" setup>
import { apiSearchVideo, VideoListType } from '@/apis/home'
import HistorySearch from '@/components/home/HistorySearch.vue'
import PopularSearch from '@/components/home/PopularSearch.vue'
import { useThrottleFn } from '@vueuse/core'
import { useSearchHistoryStore } from '@/store/search-history'

const searchStore = useSearchHistoryStore()

const searchInput = ref('')
const isLoading = ref(false)
const searchData = ref<VideoListType[]>([])

const handleSearch = useThrottleFn(async () => {
  if (!searchInput.value) return resetSearch()

  isLoading.value = true
  const res = await apiSearchVideo({ keyword: searchInput.value, page: 1, pagesize: 10 })
  searchData.value = res.data.list
}, 300)

const setInput = (e: string) => {
  searchInput.value = e
  handleSearch()
}

const resetSearch = () => {
  searchInput.value = ''
  searchData.value = []
  isLoading.value = false
}

const handleAddHistory = () => {
  searchStore.addSearchHistoryItem(searchInput.value)
}
</script>
<style lang="less" scoped></style>
