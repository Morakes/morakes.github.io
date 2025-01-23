export const useSearchHistoryStore = defineStore(
  'search-history',
  () => {
    const searchHistory = ref<string[]>([])
    const addSearchHistoryItem = (keyword: string) => {
      if (!keyword) return

      searchHistory.value.unshift(keyword)
    }

    const deleteAllSearchHistory = () => {
      searchHistory.value = []
    }

    return {
      addSearchHistoryItem,
      deleteAllSearchHistory,
      searchHistory,
    }
  },
  {
    persist: true,
  }
)
