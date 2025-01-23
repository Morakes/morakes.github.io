<template>
  <var-cell>
    <!-- 动态插槽 优先级高于静态 同名插槽覆盖静态 保留动态 -->
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name" />
    </template>
    <!-- 静态插槽 -->
    <template #default>
      <span class="text-xl text-[var(--font-color)]">{{ title }}</span>
    </template>
    <template #extra v-if="extra">
      <div class="flex items-center text-[var(--font-color)]">
        <span class="text-md text-nowrap" @click="handleTo"> {{ extra }} </span>
        <var-icon name="chevron-right" size="24px" />
      </div>
    </template>
  </var-cell>
</template>
<script lang="ts" setup>
import { Slots } from 'vue'

export interface Props {
  title?: string
  extra?: string
  handleTo?: () => void
}

defineProps<Props>()
const slots = useSlots() as Slots
</script>
<style lang="less" scoped></style>
