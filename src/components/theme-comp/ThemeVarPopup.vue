<template>
  <var-popup @close="handleClose" @click-overlay="handleClose" v-bind="props" v-model:show="isShow">
    <div class="popup-block" v-bind="props">
      <slot default></slot>
    </div>
  </var-popup>
</template>
<script lang="ts" setup>
import { PopupProps } from '@varlet/ui'

interface Props extends PopupProps {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  overlay: true,
})

const isShow = computed({
  get() {
    return props.show
  },
  set(value) {
    emits('update:show', value)
  },
})

const emits = defineEmits(['update:show'])

const handleClose = () => {
  emits('update:show', false)
}
</script>
<style lang="less" scoped>
.popup-block {
  background: var(--bg-color);
  border-radius: 10px 10px 0 0;
}
</style>
