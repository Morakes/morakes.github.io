<template>
  <var-style-provider class="pb-[var(--app-bar-height)]">
    <var-app-bar
      color="var(--bg-color)"
      text-color="var(--font-color)"
      :elevation="0"
      safe-area-top
      fixed
      :z-index="100"
      :title="title"
      :title-position="titlePosition"
      v-bind="$attrs"
    >
      <template #left>
        <slot name="left" />
      </template>

      <template #right>
        <var-space class="pr-[8px]" :size="[0, '1.4vmin']">
          <slot name="right" />
        </var-space>
      </template>

      <template #content>
        <slot name="content" />
      </template>
    </var-app-bar>
  </var-style-provider>
</template>

<script setup lang="ts">
import { AppBarProps } from '@varlet/ui'
import { PropType } from 'vue'

defineProps({
  title: {
    type: String as PropType<AppBarProps['title']>,
  },
  titlePosition: {
    type: String as PropType<AppBarProps['titlePosition']>,
    default: 'center',
  },
})
</script>
