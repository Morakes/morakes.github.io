export const useGlobalStore = defineStore(
  'global',
  () => {
    const isDark = ref()

    return {
      isDark,
    }
  },
  {
    persist: {},
  }
)
