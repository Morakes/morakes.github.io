<template>
  <var-button
    class="install-btn"
    v-show="installButtonShow"
    @click="install"
    ref="installButtonRef"
  >
    安装
  </var-button>
</template>

<script setup lang="ts">
import { useInstall } from '@/use'
defineOptions({
  name: 'Install',
})

const { installButtonRef, installButtonShow, install } = useInstall()
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(-50%, 10px) !important;
  opacity: 0;
}

.install-btn {
  position: fixed;
  bottom: 80px;
  width: 50%;
  left: 25%;
  background-color: var(--font-color);
  color: var(--bg-color);
}
</style>
