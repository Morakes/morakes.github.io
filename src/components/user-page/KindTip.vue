<template>
  <div class="root">
    <div class="kind">
      <p class="kind__title">{{ $t('pay_tips_label') }}</p>
      <div class="kind__content">
        <template v-for="item in $t('pay_tips_content').split('\n')" :key="item">
          <div>{{ item }}</div>
        </template>
      </div>
    </div>

    <div class="kind">
      <p class="kind__title">{{ $t('pay_contact_service_label') }}</p>
      <div class="kind__content">
        <template
          v-for="(item, _index) in $t('pay_contact_service_content').split('\n')"
          :key="_index"
        >
          <div v-html="item"></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.root {
  margin-top: 24px;
  padding: 10px 16px;
  background: var(--light-bg-color);
  .kind {
    &__title {
      color: var(--light-font-color);
    }
    &__content {
      color: var(--light-font-secondary-color);
    }
  }
}
</style>
