<template>
  <div class="h-[var(--app-height)] pb-[51px] overflow-y-auto">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <var-bottom-navigation safe-area fixed v-model:active="active">
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
  </div>
</template>

<script setup lang="ts">
const { router, route } = useAppRouter()
const active = ref()

const tabs = ref([
  {
    label: 'HOME',
    icon: 'tabbar-home-light',
    namespace: 'i',
    name: '/pages/home',
  },
  {
    label: 'STAR',
    icon: 'tabbar-star-dark',
    name: '/pages/star',
    namespace: 'i',
  },
  {
    label: 'USER',
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
</script>
