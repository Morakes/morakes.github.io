<template>
  <div class="relative root" :style="{ width, height }">
    <var-image
      :src="cover"
      fit="cover"
      :width="width"
      :height="height"
      :radius="radius"
      class="block border-width-[0px]"
    />
    <!-- 角标 -->
    <div
      v-show="badge"
      class="px-1 py-[2px] bg-[--color-primary-orange] color-[--font-color] text-xs flex justify-center items-center"
      :class="[`root__badge-${badgePosi}`]"
    >
      <slot name="badge">
        {{ badge }}
      </slot>
    </div>
    <var-ellipsis
      v-show="detail"
      :tooltip="false"
      :line-clamp="1"
      class="absolute bottom-[4px] left-[4px] color-[var(--dark-font-color)] text-xs w-full"
    >
      <slot name="detail">
        {{ `${detail} Episodes` }}
      </slot>
    </var-ellipsis>
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  // 封面
  cover: string
  // 角标
  badge?: string | number
  badgePosi?: 'left' | 'right'
  // 封面详情
  detail?: string | number
  // 宽度
  width?: string
  // 高度
  height?: string
  // 圆角
  radius?: string
}
withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100px',
  radius: '5px',
  badgePosi: 'right',
})
</script>
<style lang="less" scoped>
.root {
  &__badge-right {
    color: var(--dark-font-color);
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 5px;
  }
  &__badge-left {
    color: var(--dark-font-color);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px 0;
  }
}
</style>
