<template>
  <cell-template :title="$t('search_history')" class="mt-[20px]">
    <template #extra>
      <var-image
        src="@/assets/images/dustbin.png"
        class="w-[20px] h-[20px]"
        @click="isShow = true"
      />
    </template>
  </cell-template>

  <var-space class="px-[10px]">
    <var-chip
      v-for="item in searchHistory"
      :key="item"
      icon-name="delete"
      :round="false"
      color="var(--bg-layer-2)"
    >
      <var-ellipsis :tooltip="false" line-clamp="1" @click="setInput(item)">
        <span class="text-[var(--font-color)]"> {{ item }} </span>
      </var-ellipsis>
    </var-chip>
  </var-space>

  <theme-dialog
    v-model:show="isShow"
    @confirm="handleConfirm"
    @cancel="isShow = false"
    :cancel-button-text="$t('cancel')"
    :confirm-button-text="$t('confirm')"
  >
    是否清空历史记录？
  </theme-dialog>
</template>

<script lang="ts" setup>
import { useSearchHistoryStore } from '@/store/search-history'

interface Props {
  setInput: (value: string) => void
}

defineProps<Props>()
const { searchHistory } = storeToRefs(useSearchHistoryStore())
const { deleteAllSearchHistory } = useSearchHistoryStore()
const isShow = ref(false)

const handleConfirm = () => {
  deleteAllSearchHistory()
  isShow.value = false
}
</script>
<style lang="less" scoped></style>
