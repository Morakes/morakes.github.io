<template>
  <div class="payment-footer">
    <div class="flex items-center justify-between">
      <div class="flex items-end gap-3 text-lg">
        <span class="color-[var(--light-font-secondary-color)]">{{ $t('total_label') }}</span>
        <span class="color-[var(--color-primary-orange)]"
          >$
          <span class="text-4xl">{{ chargeTemplate?.price || 0 }}</span>
        </span>
      </div>
      <var-style-provider
        :style-vars="{
          '--button-large-font-size': '20px',
        }"
      >
        <var-button
          :elevation="0"
          color="var(--color-primary-orange)"
          text-color="var(--dark-font-color)"
          class="w-[180px]"
          size="large"
        >
          {{ $t('pay_now') }}
        </var-button>
      </var-style-provider>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ChargeTemplateType } from '@/apis/charge'

const props = withDefaults(
  defineProps<{
    chargeTemplate?: ChargeTemplateType
  }>(),
  {
    chargeTemplate: undefined,
  }
)
</script>
<style lang="less" scoped>
.payment-footer {
  height: 85px;
  width: 100%;
  background: var(--light-bg-color);
  padding: 10px 16px;
  border: 1px solid #eeeeee;
}
</style>
