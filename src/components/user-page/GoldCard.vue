<template>
  <div class="gold-card">
    <cell-template>
      <template #default>{{ $t('My Golds') }}</template>
    </cell-template>
    <var-space class="pl-[15px]" size="6" align="center">
      <var-image src="@/assets/images/gold-coin.png" width="40" height="40" />
      <span class="text-3xl">{{ 8 }}</span>
    </var-space>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.gold-card {
  position: relative;
  top: -43px;
  width: 343px;
  height: 86px;
  background: url('@/assets/images/gold-card-bg.png') no-repeat;
  background-size: cover;
}
</style>
