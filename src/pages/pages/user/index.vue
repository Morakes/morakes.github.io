<template>
  <div class="root">
    <var-space justify="flex-end" :size="8" class="p-[16px]">
      <app-theme-switch />
      <!-- <app-customer-service /> -->
    </var-space>

    <div class="profile">
      <profile />

      <vip-card />

      <var-paper :elevation="1" class="menu-list">
        <theme-var-cell
          v-for="(item, index) in items"
          :key="item.name"
          ripple
          :border="index !== items.length - 1"
          :border-offset="0"
          @click="pushStack(item.to)"
        >
          {{ $t(item.name) }}
          <template #icon>
            <var-image :src="getAssetsFile(item.icon)" :width="25" class="mr-2" />
          </template>
          <template #extra>
            <var-icon name="chevron-right" />
          </template>
        </theme-var-cell>
      </var-paper>

      <login-popup v-model:show="isShow" />
    </div>
  </div>

  <router-stack-view />
</template>

<script setup lang="ts">
import Profile from '@/components/Profile.vue'
import VipCard from '@/components/user-page/VipCard.vue'
import { useLoginStore, useGlobalStore } from '@/store'
import { getAssetsFile } from '@/utils/common'

const { isDark } = storeToRefs(useGlobalStore())
const { thirdPartLoginType } = storeToRefs(useLoginStore())
const isShow = ref(!thirdPartLoginType.value)

const { pushStack } = useAppRouter()

const items = computed(() => {
  return [
    {
      name: 'My Collection',
      icon: `user-collect-${isDark.value ? 'dark' : 'light'}.svg`,
      enabled: false,
      to: 'my-collection',
    },
    {
      name: 'Watch History',
      icon: `user-history-${isDark.value ? 'dark' : 'light'}.svg`,
      enabled: false,
      to: 'watch-history',
    },
    // {
    //   name: 'Spending History',
    //   icon: 'credit-card',
    //   enabled: false,
    //   to: 'spending-history',
    // },
    {
      name: 'Language Switch',
      icon: `user-language-${isDark.value ? 'dark' : 'light'}.svg`,
      enabled: false,
      to: 'language-switch',
    },
    {
      name: 'Feedback',
      icon: `user-feedback-${isDark.value ? 'dark' : 'light'}.svg`,
      enabled: false,
      to: 'feedback',
    },
    {
      name: 'System Settings',
      icon: `user-setting-${isDark.value ? 'dark' : 'light'}.svg`,
      enabled: false,
      to: 'system-setting',
    },
  ]
})
</script>

<style lang="less" scoped>
.root {
  background-color: var(--bg-color);
  min-height: 100vmax;
  .profile {
    --avatar-border: 3px solid #fff;
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .menu-list {
    --cell-padding: 20px;
    margin-top: 16px;
  }
}
</style>

<route lang="json">
{
  "meta": {
    "stacks": [
      "language-switch",
      "feedback",
      "protocol",
      "spending-history",
      {
        "name": "my-collection",
        "children": [
          {
            "name": "player",
            "children": ["tv-intro"]
          }
        ]
      },
      {
        "name": "watch-history",
        "children": [
          {
            "name": "player",
            "children": ["tv-intro"]
          }
        ]
      },
      {
        "name": "recharge-center",
        "children": ["recharge-record"]
      },
      {
        "name": "system-setting",
        "children": ["edit-nickname"]
      }
    ]
  }
}
</route>
