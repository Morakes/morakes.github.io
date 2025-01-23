const isOpenAvatarPopup = ref(false)
const files = ref<Record<'cover' | 'url', string>[]>([])

export const useAvatarPopup = () => {
  const togglePopup = () => {
    isOpenAvatarPopup.value = !isOpenAvatarPopup.value
  }

  const closePopup = () => {
    isOpenAvatarPopup.value = false
  }

  const avatarUrl = computed(() => {
    if (!files.value?.length) return ''
    return files.value[files.value.length - 1].url
  })

  return {
    isOpenAvatarPopup,
    files,
    avatarUrl,
    togglePopup,
    closePopup,
  }
}
