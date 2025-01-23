<template>
  <div class="card-wrap">
    <cell-template>
      <template #default>
        <span class="color-[--text-color]">{{ $t('Balance') }}</span>
      </template>
      <template #extra>
        <div class="flex items-center color-[--text-color]" v-show="showButton">
          <span class="text-md text-nowrap" @click="() => pushStack('/recharge-center')">
            {{ $t('recharge') }}
          </span>
          <var-icon name="chevron-right" size="24px" />
        </div>
      </template>
    </cell-template>

    <var-space class="pl-[15px]" size="6" align="center">
      <var-image src="@/assets/images/gold-coin.png" width="40" height="40" />
      <span class="text-5xl color-[--text-color]">{{ userInfo?.coinBalance }}</span>
    </var-space>

    <div class="card__bottom">
      <div class="card__bottom__box">
        <var-space direction="column" :size="0">
          <var-image :src="VipPremiumImg" width="100" />
          <span class="text-color-[#948667] text-xs">
            {{
              userInfo?.isVip
                ? $t('premium_date', { date: userInfo?.vipEndTime })
                : $t('vip_privilege')
            }}
          </span>
        </var-space>
        <var-button v-show="showButton" elevation="0" text-color="var(--text-color)">
          {{ userInfo?.isVip ? $t('activate') : $t('Renew') }}
        </var-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAppRouter } from '@/use'
import VipPremiumImg from '@/assets/images/vip-premium.png'
import { useUserStore } from '@/store'

withDefaults(
  defineProps<{
    showButton?: boolean
  }>(),
  {
    showButton: true,
  }
)

const { userInfo } = storeToRefs(useUserStore())

const { pushStack } = useAppRouter()
</script>
<style lang="less" scoped>
:deep(.var-button--default) {
  background: linear-gradient(90deg, #f8e6bb 0%, #fec565 100%);
}
.card-wrap {
  --text-color: #844113;
  --button-color: #fff7ec;
  display: block;
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  background: linear-gradient(274deg, #f9d26d 0%, #fbe9b6 100%);

  &::before {
    content: '';
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border-radius: inherit;
    background: url(@/assets/images/line-circle.png) no-repeat;
    background-size: contain;
    background-position: top;
  }
  .card__bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(270deg, #2c2e33 0, #161616 100%);
    border-radius: 0 0 8px 8px;
    .card__bottom__box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: inherit;
      width: inherit;
      padding: 0 10px;
    }
  }
}
</style>
