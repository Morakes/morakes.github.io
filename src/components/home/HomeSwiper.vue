<template>
  <div class="page-wrap">
    <var-style-provider>
      <!-- swiepr背景 -->
      <var-swipe class="swipe-container" :autoplay="3000" :loop="true">
        <template v-for="item in bannerMaterial" :key="item">
          <var-swipe-item @click="handleTo(item.redirectConfig)">
            <img class="swipe-slide-image" :src="item.bannerImg" />
            <!-- 播放器按钮 -->
            <img class="swiper-slide-player" :src="BtnPlayer" alt="button-palyer" />
          </var-swipe-item>
        </template>
        <!-- 自定义指示器 -->
        <template #indicator="{ index, length, to }">
          <div class="swipe-indicators">
            <div
              class="swipe-indicator"
              v-for="(l, idx) in length"
              :key="l"
              :class="{ 'swipe-active-indicator': idx === index }"
              @click="to(idx)"
            ></div>
          </div>
        </template>
      </var-swipe>
      <!-- 搜索贴图 -->
      <var-image
        :src="PandaSearchBg"
        class="absolute top-[20px] left-[0px] right-[0px] mx-auto"
        @click="pushStack('media-search')"
      />
      <!-- 自定义 tabs 颜色 -->
      <var-tabs
        color="transparent"
        active-color="#fff"
        inactive-color="#C4C5CF"
        v-model:active="active"
        class="absolute top-[60px] left-[0px] right-[0px] mx-auto"
      >
        <template v-for="item in tabList" :key="item.navid">
          <var-tab :name="item.navid">{{ item.navName }}</var-tab>
        </template>
      </var-tabs>
    </var-style-provider>
  </div>
</template>

<script lang="ts" setup>
import BtnPlayer from '@/assets/images/btn-player.png'
import PandaSearchBg from '@/assets/images/panda-search-bg.png'
import { useAppRouter } from '@/use'
import { HomeDataType, NavigationType, RedirectConfigType } from '@/apis/home'

const props = withDefaults(
  defineProps<{
    tabList: NavigationType[]
    activeTab: string
    bannerMaterial: HomeDataType['banner']
  }>(),
  {
    tabList: () => [],
    bannerMaterial: () => [],
  }
)

const emits = defineEmits(['update:activeTab'])

const active = computed({
  get() {
    return props.activeTab
  },
  set(value) {
    emits('update:activeTab', value)
  },
})

const { pushStack } = useAppRouter()

const handleTo = (payload: RedirectConfigType) => {
  pushStack('player', { videoId: payload.id })
}
</script>

<style lang="less" scoped>
.page-wrap {
  position: relative;
  width: 100%;
  height: 500px;
  .swipe-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    .swipe-slide-image {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .swiper-slide-player {
      position: absolute;
      right: 20px;
      bottom: 50px;
    }
    .swipe-indicators {
      position: absolute;
      display: flex;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

    .swipe-indicator {
      width: 10px;
      height: 4px;
      background: #fff;
      opacity: 0.3;
      margin: 0 4px;
      transition: opacity 0.3s;
    }

    .swipe-active-indicator {
      opacity: 1;
    }
  }
}
</style>
