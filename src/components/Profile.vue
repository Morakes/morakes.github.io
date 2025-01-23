<template>
  <div class="flex justify-between items-center h-[104px]">
    <div class="flex-1 flex items-center">
      <var-avatar class="flex-shrink-0" :src="userInfo?.avatar" size="22vmin" bordered />
      <div class="ml-[14px]">
        <var-space class="pt-[10px] text-[var(--font-color)]" :size="[0, '1.6vmin']">
          <div>
            <div class="text-2xl">{{ userInfo?.nickname || '' }}</div>
            <div class="flex items-center gap-[4px]">
              <div>{{ `ID: ${userInfo?.userid}` }}</div>
              <var-icon name="content-copy" :size="13" />
            </div>
          </div>
        </var-space>
      </div>
    </div>
    <!-- <var-space size="2">
      <span>Log in</span>
      <var-icon name="chevron-right" />
    </var-space> -->
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'

const { userInfo } = storeToRefs(useUserStore())
</script>
