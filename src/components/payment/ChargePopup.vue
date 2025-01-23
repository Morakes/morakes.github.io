<template>
  <var-popup
    v-model:show="isShow"
    :overlay="true"
    position="bottom"
    :close-on-click-overlay="false"
  >
    <div class="popup-block">
      <header class="header">
        <var-space>
          <span class="tip">Insufficient balance, please recharge</span>
          <var-space>
            Balance:
            <var-space align="center" :size="3">
              <var-image src="@/assets/images/gold-coin.png" :height="20" />
              <span class="text-red">80</span>
            </var-space>
          </var-space>
        </var-space>
        <var-icon name="window-close" class="close-icon" @click="closePopup" />
      </header>

      <main class="main">
        <recharge-card
          v-if="isFirstInit"
          @select-template="
            (e) => {
              chargeTemplate = e
            }
          "
        >
          <div class="mb-4">
            <var-space :size="0">
              <span>当前剧集价格需：</span>
              <var-image src="@/assets/images/gold-coin.png" :height="20" />
              <span class="text-[--color-primary-orange]">80</span>
            </var-space>
          </div>
        </recharge-card>

        <div class="unlock__auto">
          <var-space>
            <var-image
              :src="isAuto ? UnlockRadioActive : UnlockRadio"
              :height="25"
              @click="isAuto = !isAuto"
            />
            <span>Automatically unlock the next episode</span>
          </var-space>
        </div>
      </main>

      <payment-footer :chargeTemplate="chargeTemplate" />
    </div>
  </var-popup>
</template>
<script lang="ts" setup>
import UnlockRadio from '@/assets/images/unlock-radio.png'
import UnlockRadioActive from '@/assets/images/unlock-radio--active.png'
import { ChargeTemplateType } from '@/apis/charge'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const isShow = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})
const isAuto = ref(false)
const isFirstInit = ref(false)
const chargeTemplate = ref<ChargeTemplateType>()

watch(
  isShow,
  () => {
    isShow.value && (isFirstInit.value = true)
  },
  {
    once: true,
  }
)

function closePopup() {
  isShow.value = false
}
</script>
<style lang="less" scoped>
.popup-block {
  background-color: var(--light-bg-color);
  color: var(--light-font-color);
  height: 70vh;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  .header {
    background-color: rgba(245, 247, 250, 1);
    border-radius: inherit;
    padding: 12px;
    .tip {
      color: var(--light-font-color);
      font-size: 16px;
      font-weight: 600;
    }
    .close-icon {
      position: absolute;
      right: 12px;
      top: 24px;
      font-size: 24px;
    }
  }
  .main {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
    .unlock__auto {
      margin-top: 16px;
      color: var(--light-font-secondary-color);
    }
  }
}
</style>
