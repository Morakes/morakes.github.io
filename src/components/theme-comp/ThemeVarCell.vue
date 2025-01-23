<!-- 主题色cell -->

<template>
  <var-cell class="bg-[var(--cell-bg-layer)]" v-bind="props">
    <template v-for="(_, name) in slots" :key="name" #[name]>
      <slot :name="name"></slot>
    </template>
  </var-cell>
</template>
<script lang="ts" setup>
import { CellProps } from '@varlet/ui'
import { Slots } from 'vue'

type Props = CellProps

const props = withDefaults(defineProps<Props>(), {})

const slots = useSlots() as Slots
</script>
<style lang="less" scoped></style>
