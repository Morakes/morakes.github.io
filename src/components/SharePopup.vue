<template>
  <theme-var-popup v-model:show="isShow" position="bottom">
    <div class="share-popup">
      <header class="header">{{ $t('share') }}</header>
      <var-icon name="window-close" class="close-icon" @click="isShow = false" />

      <var-row :gutter="[20, 0]" class="share-list">
        <template v-for="item in linkConfig" :key="item.name">
          <var-col :span="6">
            <div class="share-item">
              <var-image :src="item.icon" alt="icon" height="50" width="50" />
              <span>{{ item.name }}</span>
            </div>
          </var-col>
        </template>
      </var-row>
    </div>
  </theme-var-popup>
</template>
<script lang="ts" setup>
import ThemeVarPopup from './theme-comp/ThemeVarPopup.vue'
import FacebookIcon from '@/assets/images/facebook-share.png'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
}>()

const isShow = computed({
  get: () => props.show,
  set: (value) => {
    emit('update:show', value)
  },
})

const linkConfig = [
  {
    icon: FacebookIcon,
    name: 'Facebook',
    handler: () => {},
  },
  {
    icon: FacebookIcon,
    name: 'Facebook',
    handler: () => {},
  },
  {
    icon: FacebookIcon,
    name: 'Facebook',
    handler: () => {},
  },
  {
    icon: FacebookIcon,
    name: 'Facebook',
    handler: () => {},
  },
  {
    icon: FacebookIcon,
    name: 'Facebook',
    handler: () => {},
  },
]
</script>
<style lang="less" scoped>
.share-popup {
  padding: 12px;
  .header {
    text-align: center;
    padding-bottom: 24px;
    color: var(--font-color);
  }
  .close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
  .share-list {
    .share-item {
      padding: 0 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: var(--font-tip-color);
    }
  }
}
</style>
