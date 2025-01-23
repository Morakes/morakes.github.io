<template>
  <var-style-provider
    :style-vars="{
      '--dialog-background': 'var(--bg-color)',
    }"
  >
    <var-dialog v-bind="props" v-model:show="isShow">
      <template v-for="(_, name) in slots" :key="name" #[name]>
        <slot :name="name"></slot>
      </template>
    </var-dialog>
  </var-style-provider>
</template>
<script lang="ts" setup>
import { i18n } from '@/i18n'
import { DialogProps } from '@varlet/ui'
import { useVModel } from '@varlet/use'
import { Slots } from 'vue'

interface Props extends Omit<DialogProps, 'show'> {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  overlay: true,
  closeOnClickOverlay: true,
  cancelButton: true,
  confirmButton: true,
  confirmButtonText: i18n.global.t('confirm'),
  cancelButtonText: i18n.global.t('cancel'),
  cancelButtonColor: 'var(--bg-layer-1)',
  confirmButtonColor: 'var(--color-primary-orange)',
  cancelButtonTextColor: 'var(--font-color)',
  confirmButtonTextColor: 'var(--dark-font-color)',
})

const isShow = useVModel(props, 'show')
const slots = useSlots() as Slots
</script>
<style lang="less" scoped></style>
