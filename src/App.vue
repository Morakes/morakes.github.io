<template>
  <var-highlighter-provider
    :highlighter="{ codeToHtml }"
    :theme="isDark ? 'vitesse-dark' : 'vitesse-light'"
  >
    <router-view />
  </var-highlighter-provider>
</template>

<script setup lang="ts">
import { useDark } from './use'
import { codeToHtml } from 'shiki'
import { useLoginStore } from '@/store'

const loginStore = useLoginStore()

const { isDark } = useDark()

onMounted(async () => {
  // 当没有token时不刷新token 应该执行登录
  if (loginStore.getToken()) {
    await loginStore.refreshToken()
  }
})
</script>
