<template>
  <router-stack>
    <div class="page-wrap">
      <div ref="dynamicBgRef" class="px-[16px] page-wrap__bg"></div>
      <div class="page-wrap__content">
        <div class="flex items-center justify-between">
          <app-back class="absolute left-[-10px]" />
          <var-icon name="share-outline" size="35" @click="showShare = !showShare" />
        </div>

        <!-- 顶部封面 -->
        <div class="mt-4 flex gap-4 relative">
          <var-image
            :src="videoInfo?.cover"
            fit="cover"
            height="125"
            width="100"
            radius="12px"
            class="shrink-0"
          />
          <div>
            <div class="text-lg">{{ videoInfo?.videoName }}</div>
            <div class="text-md mt-2 color-[--font-secondary-color]">
              <!-- {{
                `${!!videoInfo?.isEnd ? $t('complete') : $t('not_complete')} · ${
                  videoInfo?.totalEpisodeNum
                } ${$t('episode')}`
              }} -->
              {{ $t('ep_update_num', { num: videoInfo?.totalEpisodeNum }) }}
            </div>
            <var-space class="absolute bottom-[0px]">
              <var-chip
                color="rgba(255, 255, 255, 0.05)"
                text-color="var(--dark-font-color)"
                v-for="item in videoInfo?.tagInfo"
                :key="item"
                size="small"
              >
                {{ item }}
              </var-chip>
            </var-space>
          </div>
        </div>

        <!-- 描述 -->
        <label class="mt-[16px] block text-xl color-white">{{ $t('description') }}</label>
        <div class="color-[var(--dark-font-secondary-color)] text-md mt-[10px]">
          <var-ellipsis :line-clamp="3" :tooltip="false" class="relative" expand-trigger="click">
            {{ videoInfo?.summary }}
          </var-ellipsis>
        </div>

        <!-- line -->
        <div class="h-[1px] bg-[var(--bg-layer-2)] w-full mt-6"></div>

        <!-- you might like -->
        <recom-video :video-id="videoId" :title="$t('you_might_like')" />
      </div>

      <!-- fixed button -->
      <div class="page-wrap__footer">
        <div class="flex px-[16px]">
          <var-button
            block
            :elevation="0"
            color="rgba(0, 0, 0, 1)"
            text-color="var(--light-bg-color)"
            @click="fetchCollectionVideo"
          >
            <var-image
              :src="videoInfo?.isCollect ? StarIconActive : StarIcon"
              height="17px"
              width="17px"
              class="mr-1"
            />
            {{ videoInfo?.isCollect ? $t('no_add_yet') : $t('add_to_fav') }}
          </var-button>
          <var-button
            block
            :elevation="0"
            color="#152D44"
            text-color="var(--light-bg-color)"
            :round="false"
            @click="pushParentRoute"
            >{{ $t('continue_play') }}</var-button
          >
        </div>
      </div>
    </div>

    <share-popup v-model:show="showShare" />
  </router-stack>
</template>

<script lang="ts" setup>
import { apiGetVideoInfo, TVInfo, apiCollectionVideo, apiDeleteCollection } from '@/apis/video'
import { useAppRouter } from '@/use'
import RecomVideo from '@/components/recom-video/index.vue'
import ImageColor from '@/plugin/image-color-theme'
import StarIconActive from '@/assets/images/big-star--active.png'
import StarIcon from '@/assets/images/big-star.png'
import SharePopup from '@/components/SharePopup.vue'

const imageColor = new ImageColor(10)

const dynamicBgRef = ref<HTMLDivElement>()
const { route, pushParentRoute } = useAppRouter()
const videoInfo = ref<TVInfo>()
const videoId = ref('')
const showShare = ref(false)

const fetchTVInfo = async (videoid: string) => {
  apiGetVideoInfo({ videoid }).then((res) => {
    videoInfo.value = res.data

    dynamicBgRef.value!.style.cssText = `
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${videoInfo.value?.cover});
    background-blend-mode: multiply;
    filter: blur(3px);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;`
    nextTick(() => {
      imageColor.loadImageUrl(videoInfo.value!.cover)
    })
  })
}

const fetchCollectionVideo = () => {
  if (!videoInfo.value?.isCollect) {
    apiCollectionVideo({ videoid: videoId.value }).then(() => {
      videoInfo.value!.isCollect = !videoInfo.value?.isCollect
    })
    return
  }
  apiDeleteCollection({ ids: [videoId.value], isAllDel: 0 }).then(() => {
    videoInfo.value!.isCollect = !videoInfo.value?.isCollect
  })
}

onMounted(() => {
  if (route.query.videoId) {
    videoId.value = route.query.videoId as string
    fetchTVInfo(videoId.value)
  }
})
</script>

<style lang="less" scoped>
.page-wrap {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(21, 45, 68, 0.3) 0%,
    rgba(21, 45, 68, 1) 30%,
    rgba(21, 45, 68, 1) 100%
  );
  min-height: 100vh;
  height: 100%;
  padding-bottom: 80px;
  color: var(--dark-font-color);
  overflow-y: auto;

  &__bg {
    position: absolute;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 180px;
    padding: 0;
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: 0 16px;
    min-height: 100vh;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.75) 30%,
      rgba(0, 0, 0, 0.75) 100%
    );
  }

  &__footer {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 1);
    height: 80px;
    width: 100%;
    padding-top: 16px;
  }
}
</style>
