<script setup lang="ts">
import { withDefaults, defineSlots } from 'vue';

// 定义插槽类型
const slots = withDefaults(defineSlots<{
  default?: () => any;
  header?: (props: { title: string }) => any;
  footer?: () => any;
}>(), {
  default: () => <div>默认内容</div>,
  header: (props) => <div>默认头部 {props.title}</div>,
  footer: () => <div>默认底部</div>,
});
</script>

<template>
  <div>
    <header>
      <slot name="header" :title="title"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>