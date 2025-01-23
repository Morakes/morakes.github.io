<template>
  <custom-skeleton :loading="loading" card :rows="0">
    <slot name="default"> </slot>
    <var-row :gutter="[20, 10]">
      <template v-for="item in chargeTemplateList" :key="item.bundleid">
        <var-col span="12" class="flex flex-col justify-center items-center">
          <recharge-card-item
            :data="item"
            :is-active="selected === item.bundleid"
            @click="handleSelectTemplate(item)"
          />
        </var-col>
      </template>
    </var-row>
  </custom-skeleton>
</template>
<script lang="ts" setup>
import { apiGetChargeTemplate, ChargeTemplateType } from '@/apis/charge'

defineSlots<{
  default?: () => any
}>()

const emits = defineEmits<{
  (e: 'selectTemplate', value: ChargeTemplateType): void
}>()

const loading = ref(true)
const selected = ref()
const chargeTemplateList = ref<ChargeTemplateType[]>([])

function handleSelectTemplate(item: ChargeTemplateType) {
  selected.value = item.bundleid
  emits('selectTemplate', item)
}

function fetchTemplate() {
  apiGetChargeTemplate()
    .then((res) => {
      chargeTemplateList.value = res.data.items
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 300)
    })
}

onMounted(() => {
  fetchTemplate()
})
</script>
<style lang="less" scoped>
.recharge-card {
  --bg-card-color: rgb(246, 247, 249);

  position: relative;
  display: block;
  width: 100%;
  height: 90px;
  background: var(--bg-card-color);
  border-radius: 8px;

  &__body {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: inherit;
    transition: background 0.25s linear;

    &__price {
      position: relative;
      font-weight: 600;
    }
    &__coin {
      position: relative;
    }
    &__badge {
      position: absolute;
      top: -12px;
      left: 0;
      padding: 4px 4px;
      color: var(--dark-font-color);
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
    }
    &__cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }
  &__body--selected {
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--color-primary-orange);
    background-color: rgba(#ffa327, 0.1);
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 25px;
      width: 28px;
      content: '';
      border: transparent;
      background: url(@/assets/images/badge-selected.png) no-repeat;
      background-size: cover;
    }
  }
}
</style>
