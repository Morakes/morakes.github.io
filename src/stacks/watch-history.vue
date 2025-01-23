<template>
  <router-stack>
    <var-style-provider :style-vars="{ '--cell-padding': '16px 12px' }">
      <app-header text-color="var(--font-color)">
        <template #left>
          <app-back />
          {{ $t('Watch History') }}
        </template>
      </app-header>
    </var-style-provider>
  </router-stack>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped></style>
