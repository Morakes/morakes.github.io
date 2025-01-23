<template>
  <var-popup position="bottom" :show="show" @close="handleClose" @click-overlay="handleClose">
    <var-style-provider>
      <div class="popup-block">
        <div class="text-center text-lg font-600 relative w-full">
          <div class="absolute top-[0px] left-[0px]">
            <var-icon name="chevron-down" @click="handleClose" size="30" />
          </div>
          {{ $t('speed') }}
        </div>

        <div class="mt-[20px]">
          <var-cell
            v-for="item in rates"
            :key="item.value"
            @click="handleCellClick(item.value)"
            class="menu-list"
          >
            <span
              class="text-[var(--dark-font-color)]"
              :class="item.value === selectValue ? 'menu-list__text--active' : ''"
            >
              {{ item.label }}
            </span>
            <template #extra v-if="item.value === selectValue">
              <var-icon
                name="check"
                :class="item.value === selectValue ? 'menu-list__icon--active' : ''"
              />
            </template>
          </var-cell>
        </div>
      </div>
    </var-style-provider>
  </var-popup>
</template>
<script lang="ts" setup>
import { EVENT_KEY, useEmit } from '../hooks/useMitt'
import { playerStore } from '../store/index'

interface Props {
  show: boolean
}

defineProps<Props>()
const emits = defineEmits(['update:show'])
const selectValue = computed({
  get() {
    return playerStore.state.playRate
  },
  set(val: number) {
    playerStore.updateStore({
      playRate: val,
    })
    // 发送事件
    useEmit(EVENT_KEY.CHANGE_PLAYBACK_RATE, val)
  },
})

const rates = [
  {
    label: '3.0x',
    value: 3,
  },
  {
    label: '2.0x',
    value: 2,
  },
  {
    label: '1.5x',
    value: 1.5,
  },
  {
    label: '1.25x',
    value: 1.25,
  },
  {
    label: '1.0x (Default)',
    value: 1,
  },
  {
    label: '0.75x',
    value: 0.75,
  },
]

const handleClose = () => {
  emits('update:show', false)
}
const handleCellClick = (val: number) => {
  selectValue.value = val
}
</script>

<style lang="less" scoped>
.popup-block {
  height: 100%;
  padding: 20px 16px;
  width: 100%;
  color: var(--dark-font-color);
  background-color: var(--dark-bg-color);
  .menu-list {
    --cell-padding: 10px 0px;
    &__text--active {
      color: var(--color-primary);
    }
    &__icon--active {
      color: var(--color-primary);
    }
  }
}
</style>
