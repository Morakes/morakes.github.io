<template>
  <router-stack>
    <div class="page-wrap">
      <!-- header -->
      <div class="header">
        <div class="w-full flex justify-between items-center fixed p-[16px] bg-[#22272e] z-1">
          <div class="flex items-center">
            <var-icon class="text-[40px]! ml-[-15px]" name="chevron-left" @click="goBack" />
            <span>
              {{ $t('recharge_center') }}
            </span>
          </div>
          <span @click="pushStack('recharge-record')">{{ $t('record') }}</span>
        </div>
      </div>

      <div class="main">
        <!-- 充值中心 -->
        <div class="recharge-center">
          <div class="relative top-[-25px]">
            <vip-card :show-button="false" />
          </div>
          <div class="recharge-card">
            <recharge-card class="pt-6" @select-template="(e) => (chargeTemplate = e)">
              <div class="color-[var(--light-font-color)] text-lg font-600 mb-5">
                {{ $t('add_coins') }}
              </div>
            </recharge-card>
          </div>
        </div>

        <!-- tips -->
        <kind-tip />
      </div>

      <!-- 置底 -->
      <div class="payment-bar">
        <payment-footer :charge-template="chargeTemplate" />
      </div>
    </div>
  </router-stack>
</template>
<script lang="ts" setup>
import RechargeCard from '@/components/user-page/RechargeCard.vue'
import KindTip from '@/components/user-page/KindTip.vue'
import { useAppRouter } from '@/use'
import { ChargeTemplateType } from '@/apis/charge'

const { pushStack, pushParentRoute } = useAppRouter()
const chargeTemplate = ref<ChargeTemplateType>()

const goBack = () => {
  pushParentRoute()
}
</script>
<style lang="less" scoped>
.page-wrap {
  // min-height: 0;
  background-color: #f5f7fa;
  :deep(.var-app-bar__toolbar) {
    background: #22272e;
    border: 1px solid #22272e;
  }
  .header {
    height: calc(var(--app-bar-height) + 70px);
    background-color: #22272e;
    color: var(--dark-font-color);
  }
  .main {
    .recharge-center {
      padding: 0 16px;
      background: var(--light-bg-color);
    }
    padding-bottom: 85px;
  }
  .payment-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
