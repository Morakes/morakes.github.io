<template>
  <var-space direction="column" size="12px">
    <template v-for="item in moduleVideo" :key="item">
      <cell-template :title="item.moduleName" :extra="$t('more')"> </cell-template>

      <template v-if="isGird(item.moduleType)">
        <gird-mode
          v-bind="getDefaultConfig(item.moduleType)"
          :list="item.videoList"
          @go-to="handleGoTo"
        />
      </template>
      <template v-if="isScroll(item.moduleType)">
        <scroll-mode
          v-bind="getDefaultConfig(item.moduleType)"
          :list="item.videoList"
          @go-to="handleGoTo"
        />
      </template>
      <template v-if="isVertical(item.moduleType)">
        <vertical-mode
          v-bind="getDefaultConfig(item.moduleType)"
          :list="item.videoList"
          @go-to="handleGoTo"
        />
      </template>
    </template>
  </var-space>
</template>

<script lang="ts" setup>
import { HomeDataType } from '@/apis/home'
import { isGird, isScroll, isVertical, getDefaultConfig } from './config'
import VerticalMode from './components/VerticalMode.vue'
import ScrollMode from './components/ScrollMode.vue'
import GirdMode from './components/GirdMode.vue'
import { useAppRouter } from '@/use'

const { pushStack } = useAppRouter()

withDefaults(
  defineProps<{
    moduleVideo: HomeDataType['moduleVideo']
  }>(),
  {
    moduleVideo: () => [],
  }
)

const handleGoTo = (videoId: string) => {
  pushStack('player', {
    videoId: videoId,
  })
}
</script>
<style lang="less" scoped></style>
