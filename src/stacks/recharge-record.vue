<template>
  <router-stack>
    <var-style-provider>
      <app-header>
        <template #left>
          <app-back />
          {{ $t('recharge_record') }}
        </template>
      </app-header>

      <var-list
        @load="handleLoad"
        loading-text="loading..."
        v-model:loading="loading"
        :finished="finished"
        :immediate-check="true"
      >
        <var-cell border v-for="item in recordList" :key="item">
          <div class="flex justify-between items-center">
            <var-space direction="column">
              <span>{{ item.text }}</span>
              <span class="text-xs color-[var(--dark-font-secondary-color)]">
                {{ item.time }}
              </span>
            </var-space>
            <div class="color-[var(--color-primary-orange)]">{{ `$${item.price}` }}</div>
          </div>
        </var-cell>
      </var-list>
    </var-style-provider>
  </router-stack>
</template>
<script lang="ts" setup>
import { apiGetChargeRecord, ChargeRecordType } from '@/apis/charge'

const loading = ref(true)
const finished = ref(false)
const recordList = ref<ChargeRecordType[]>([])
const page = reactive({
  page: 1,
  pagesize: 10,
  total: 0,
})

const fetchDataList = async () => {
  const res = await apiGetChargeRecord({ ...page })
  recordList.value.push(...res.data.list)
  page.total = res.data.total
  loading.value = false

  if (recordList.value.length >= page.total) {
    finished.value = true
  }
}

// load more
const handleLoad = () => {
  fetchDataList()
}

onMounted(() => {
  fetchDataList()
})
</script>
<style lang="less" scoped></style>
