<template>
  <div class="h-[var(--app-height)] pb-[51px] overflow-y-auto">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <var-style-provider
      :style-vars="{
        '--bottom-navigation-background-color': 'var(--bg-color)',
        '--bottom-navigation-item-active-color': 'var(--color-primary-orange)',
        '--bottom-navigation-item-active-background-color': 'transparent',
      }"
    >
      <var-bottom-navigation safe-area fixed v-model:active="active" boredr>
        <var-bottom-navigation-item
          v-for="item in tabs"
          :key="item.label"
          :label="$t(item.label)"
          :icon="item.icon"
          :name="item.name"
          :namespace="item.namespace"
          @click="() => to(item.name)"
        />
      </var-bottom-navigation>
    </var-style-provider>
  </div>
  <pwa-update-prompt />
  <pwa-install />
</template>

<script setup lang="ts">
const { router, route } = useAppRouter()
import { useUserStore } from '@/store/user'
import PwaInstall from '@/components/PwaInstall.vue'
import PwaUpdatePrompt from '@/components/PwaUpdatePrompt.vue'

const { getUserInfo } = useUserStore()
const active = ref()
const tabs = ref([
  {
    label: 'HOME',
    icon: 'tabbar-home-light',
    namespace: 'i',
    name: '/pages/home',
  },
  {
    label: 'Favorite',
    icon: 'tabbar-star-light',
    name: '/pages/star',
    namespace: 'i',
  },
  {
    label: 'Rewards',
    icon: 'tabbar-reward-light',
    name: '/pages/rewards',
    namespace: 'i',
  },
  {
    label: 'Mine',
    icon: 'tabbar-user-light',
    name: '/pages/user',
    namespace: 'i',
  },
])

watch(
  () => route.path,
  (newValue) => {
    active.value = newValue
  },
  { immediate: true }
)

function to(path: string) {
  router.replace(path)
}

onMounted(async () => {
  await getUserInfo()
})
</script>

<style lang="less" scoped>
// :deep(.var-bottom-navigation--fixed) {
//   border-top: 1px solid #eee;
// }
</style>
