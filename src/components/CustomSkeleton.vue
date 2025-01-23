<template>
  <var-style-provider :style-vars="styleVars">
    <var-skeleton v-bind="props">
      <slot name="default"></slot>
    </var-skeleton>
  </var-style-provider>
</template>
<script lang="ts" setup>
import { SkeletonProps } from '@varlet/ui'

interface Props extends SkeletonProps {
  mode?: 'black' | 'white'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'black',
})

const dynamicVars = computed(() => {
  if (props.mode === 'black') {
    return {
      '--skeleton-card-background-color': '#363639',
      '--skeleton-animation-background':
        'linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.1), hsla(0, 0%, 100%, 0))',
    }
  }
  return {
    '--skeleton-card-background-color': '#F6F7F9',
    '--skeleton-animation-background':
      'linear-gradient(90deg, hsla(0, 0%, 100%, 0.1), hsla(0, 0%, 100%, 1), hsla(0, 0%, 100%, 0.1))',
  }
})

const styleVars = computed(() => {
  return {
    '--skeleton-avatar-border-radius': '0px',
    '--skeleton-card-margin-bottom': '0px',
    // ...dynamicVars.value,
  }
})
</script>
<style lang="less" scoped>
:deep(.var-skeleton__avatar) {
  width: 90px;
  height: 120px;
  border-radius: 8px;
}
</style>
