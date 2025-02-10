export function useAutoComplete(
  data: { match?: string[]; value: Ref<any> } = {
    match: [],
    value: ref(''),
  }
) {
  const options = computed(() => {
    return data.match?.map((suffix) => {
      const [prefix] = data.value.value.split('@')
      return {
        label: `${prefix}${suffix}`,
        value: `${prefix}${suffix}`,
      }
    })
  })

  return {
    options,
  }
}
