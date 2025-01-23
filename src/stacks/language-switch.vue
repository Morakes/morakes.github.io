<template>
  <router-stack>
    <!-- <var-app-bar text-color="var(--font-color)" color="var(--bg-color)" :elevation="0">
      <var-space align="center">
        <app-back />
        <span>{{ $t('Language') }}</span>
      </var-space>
    </var-app-bar> -->
    <app-header>
      <template #left>
        <app-back />
        {{ $t('Language') }}
      </template>
    </app-header>
    <var-paper :elevation="1" class="menu-list">
      <template v-for="(item, index) in menuList" :key="item">
        <theme-var-cell
          :border="index !== menuList.length - 1"
          :border-offset="0"
          ripple
          @click="handleCellClick()"
        >
          <span :class="item.locale === locale ? 'menu-list__text--active' : ''">
            {{ item.name }}
          </span>
          <template #extra v-if="item.locale === locale">
            <var-icon
              name="check"
              :class="item.locale === locale ? 'menu-list__icon--active' : ''"
            />
          </template>
        </theme-var-cell>

        <theme-dialog v-model:show="show" @confirm="handleConfirm">
          <span class="text-xl"> {{ $t('switch_language_tip') }} </span>
        </theme-dialog>
      </template>
    </var-paper>
  </router-stack>
</template>

<script lang="ts" setup>
import { useLocale, Locale } from '@/use/useLocale'

const { setLocale, locale } = useLocale()

const show = ref(false)

const menuList = [
  {
    name: 'english',
    locale: Locale['en-US'],
  },
  {
    name: '简体中文',
    locale: Locale['zh-CN'],
  },
]

function handleCellClick() {
  show.value = !show.value
}

function handleConfirm() {
  setLocale(locale.value === Locale['en-US'] ? Locale['zh-CN'] : Locale['en-US'])
  window.location.reload()
}
</script>
<style lang="less" scoped>
.overlay-class {
  --dialog-background: red;
}
.menu-list {
  --cell-padding: 20px;
  margin: 16px;
  &__text--active {
    color: var(--color-primary);
  }
  &__icon--active {
    color: var(--color-primary);
  }
}
</style>
