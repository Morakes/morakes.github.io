<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <iframe
      ref="iframeRef"
      style="width: 500px"
      class="h-full border-none"
      src="./index.html"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { useDesktop } from '@/use/useDesktop'
const { iframeRef } = useDesktop()
</script>
