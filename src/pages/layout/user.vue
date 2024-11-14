<template>
  <div class="profile">
    <var-pull-refresh v-model="isRefresh" @refresh="handleRefresh">
      <app-header>
        <template #left>
          <app-side-menu />
        </template>
        <template #right>
          <app-locale-switch />
          <app-theme-switch />
        </template>
        <template #content>
          <profile />
        </template>
      </app-header>

      <var-paper :elevation="1" class="menu-list">
        <var-cell v-for="(item, index) in items" :key="item.name" ripple :icon="item.icon"
          :border="index !== items.length - 1" :border-offset="0">
          {{ item.name }}

          <template #extra>
            <var-icon name="chevron-right" />
          </template>
        </var-cell>
      </var-paper>

      <var-paper :elevation="1" class="menu-list">
        <var-cell v-for="(item, index) in items" :key="item.name" ripple :icon="item.icon"
          :border="index !== items.length - 1" :border-offset="0">
          {{ item.name }}

          <template #extra>
            <var-icon name="chevron-right" />
          </template>
        </var-cell>
      </var-paper>
    </var-pull-refresh>
  </div>

  <router-stack-view />
</template>

<script setup lang="ts">
import Profile from './components/Profile.vue'
const isRefresh = ref(false)

const items = ref([
  {
    name: '我的收藏',
    icon: 'star',
    enabled: false,
  },
  {
    name: '观看记录',
    icon: 'heart',
    enabled: false,
  },
  {
    name: '语言',
    icon: 'close-circle',
    enabled: false,
  },
  {
    name: '反馈',
    icon: 'close-circle',
    enabled: false,
  },
  {
    name: '系统设置',
    icon: 'close-circle',
    enabled: false,
  },
])

function handleRefresh() {
  isRefresh.value = false
}
</script>

<style lang="less" scoped>
.profile {
  --profile-header-height: 152px;
  --avatar-border: 3px solid #fff;
  padding-top: calc(var(--profile-header-height) + 16px);
}

.menu-list {
  --cell-padding: 20px;
  margin: 16px;
}
</style>

<route lang="json">{
  "meta": {
    "stacks": [
      "sign-up",
      "settings",
      {
        "name": "sign-in",
        "children": [
          "sign-up",
          "forgot-password"
        ]
      }
    ]
  }
}</route>
