<template>
  <div class="unlock-mask">
    <var-space align="center" class="relative top-[15px]">
      <var-icon name="chevron-left" :size="35" @click="pushParentRoute" />
      {{ `Ep.${playerStore.state.currentEpisode?.episodeNumber}` }}
    </var-space>

    <div class="unlock__tip">
      <div class="text-center">{{ $t('unlock_tip') }}</div>
      <var-button
        class="mt-[20px]"
        type="primary"
        block
        color="var(--color-primary-orange)"
        text-color="var(--dark-font-color)"
        @click="isShowCharge = true"
      >
        {{ $t('unlock_episode') }}
      </var-button>
    </div>

    <div class="unlock__auto">
      <var-space>
        <var-image :src="isAuto ? UnlockRadioActive : UnlockRadio" @click="handleToggleChange" />
        <span>{{ $t('auto_unlock') }}</span>
      </var-space>
    </div>

    <charge-popup v-model:show="isShowCharge" />
  </div>
</template>
<script lang="ts" setup>
import { useAppRouter } from '@/use'
import { playerStore } from '../store/index'
import UnlockRadio from '@/assets/images/unlock-radio.png'
import UnlockRadioActive from '@/assets/images/unlock-radio--active.png'
import ChargePopup from '@/components/payment/ChargePopup.vue'

const { pushParentRoute } = useAppRouter()
const isAuto = ref(false)
const isShowCharge = ref(false)

function handleToggleChange() {
  isAuto.value = !isAuto.value
}
</script>
<style lang="less" scoped>
.unlock-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: blur(15px);
  padding: 0 10px;
  color: var(--dark-font-color);
  .unlock__tip {
    position: absolute;
    width: 80vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
  .unlock__auto {
    position: absolute;
    bottom: 80px;
    left: 50%;
    width: 100%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: center;
  }
}
</style>
