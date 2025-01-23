<template>
  <var-popup position="bottom" :show="show" @close="handleClose" @click-overlay="handleClose">
    <div class="popup-block">
      <div v-for="item in config" :key="item.label">
        <var-cell @click="handler(item.label)">
          <var-space class="text-[var(--dark-font-color)]">
            <var-image :src="item.icon" height="20px" width="20px" />{{ $t(item.label) }}
          </var-space>
          <template #extra>
            <var-switch
              v-if="item.label === 'danmaku'"
              v-model="formValue.danmaku"
              @change="handleChangeDanmaku"
            />

            <div v-if="item.label === 'speed'">
              <div class="chip">
                <div
                  v-for="rate in rates"
                  :key="rate.value"
                  class="chip-item"
                  :class="{ 'chip-item--active': rate.value === formValue.rate }"
                  @click="handleChangeSpeed(rate.value)"
                >
                  {{ rate.label }}
                </div>
              </div>
            </div>
          </template>
        </var-cell>
      </div>
    </div>
  </var-popup>
</template>

<script lang="ts" setup>
import DanmakuIcon from '@/assets/images/danmaku.png'
import ScreenIcon from '@/assets/images/screen.png'
import SpeedIcon from '@/assets/images/speed.png'
import { EVENT_KEY, useEmit } from '../hooks/useMitt'
import { playerStore } from '../store/index'

interface Props {
  show: boolean
}

defineProps<Props>()
const emits = defineEmits(['update:show'])
const formValue = reactive({
  rate: computed({
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
  }),
  danmaku: false,
  fullScreen: false,
})

const rates = [
  {
    label: '0.75x',
    value: 0.75,
  },
  {
    label: '1.0x',
    value: 1,
  },
  {
    label: '1.25x',
    value: 1.25,
  },
  {
    label: '1.5x',
    value: 1.5,
  },
  {
    label: '2.0x',
    value: 2,
  },
  {
    label: '3.0x',
    value: 3,
  },
]

const config = [
  { label: 'speed', icon: SpeedIcon },
  { label: 'danmaku', icon: DanmakuIcon },
  { label: 'clear_screen', icon: ScreenIcon },
  /** 画中画 */
  // { label: 'Picture-in-Picture', icon: PipIcon },
]
function handler(type: string) {
  if (['speed', 'danmaku'].includes(type)) return

  if (type === 'clear_screen') {
    handleFullScreen()
    return
  }
}

function handleChangeSpeed(value: number) {
  formValue.rate = value
  // useEmit(EVENT_KEY.CHANGE_PLAYBACK_RATE, value)
}

function handleChangeDanmaku(value: boolean) {
  console.log('弹幕', value)
  formValue.danmaku = value
  // useEmit(EVENT_KEY.TOGGLE_COMMENT, value)
}

function handleFullScreen() {
  console.log('全屏')
  useEmit(EVENT_KEY.ENTER_FULLSCREEN)
  handleClose()
}

const handleClose = () => {
  emits('update:show', false)
}
</script>

<style lang="less" scoped>
.popup-block {
  height: 260px;
  padding: 20px 0;
  width: 100%;
  color: var(--dark-font-color);
  background-color: var(--dark-bg-color);
  .chip {
    width: 260px;
    height: 32px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--dark-bg-layer-1);
    padding: 2px;
    .chip-item {
      flex-basis: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: var(--dark-font-secondary-color);
    }
    .chip-item--active {
      background-color: rgba(34, 39, 46, 1);
      color: var(--color-primary-orange);
    }
  }
}
</style>
