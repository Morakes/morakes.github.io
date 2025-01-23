<template>
  <var-style-provider
    :style-vars="{
      '--floating-panel-background': 'var(--dark-bg-color)',
    }"
  >
    <var-floating-panel
      v-model:anchor="computedAnchor"
      :anchors="anchors"
      :content-draggable="false"
      :teleport="teleport"
    >
      <template #header v-if="computedAnchor === anchors[anchors.length - 1]">
        <div class="p-[10px]">
          <var-icon
            name="chevron-down"
            color="var(--dark-font-color)"
            :size="30"
            @click="computedAnchor = 0"
          />
        </div>
      </template>
      <div class="panel">
        <div class="panel__top">
          <var-space align="center">
            <var-image :src="videoInfo.cover" height="75px" width="60px" radius="5px" fit="cover" />

            <var-space direction="column">
              <div>
                <var-ellipsis
                  :tooltip="false"
                  class="max-w-[40vmin] text-[var(--dark-font-color)] text-lg"
                  line-clamp="1"
                  @click="pushStack('tv-intro', { videoId: videoInfo.videoid })"
                >
                  {{ videoInfo.videoName }}
                </var-ellipsis>
                <var-icon name="chevron-right" />
              </div>

              <var-ellipsis :tooltip="false" class="text-[--font-secondary-color] text-md">
                {{ $t('ep_update_num', { num: videoInfo.totalEpisodeNum }) }}
              </var-ellipsis>
            </var-space>
          </var-space>

          <var-style-provider :style-vars="{ '--button-border-radius': '4px' }">
            <var-button
              type="primary"
              :color="
                videoInfo.isCollect ? 'var(--dark-bg-layer-1)' : 'var(--color-primary-orange)'
              "
              :text-color="
                videoInfo.isCollect ? 'var(--dark-font-secondary-color)' : 'var(--dark-font-color)'
              "
              :elevation="0"
              @click="handleToggleCollect"
            >
              <var-image
                :src="videoInfo.isCollect ? StarIconActive : StarIcon"
                height="17px"
                width="17px"
                class="mr-1"
              />
              {{ $t('save') }}
            </var-button>
          </var-style-provider>
        </div>

        <div class="panel__main">
          <var-space>
            <template v-for="item in switchComb.tabList" :key="item.value">
              <span
                class="panel__main-item"
                :class="{
                  'panel__main-item--noactive': item.value !== switchComb.active,
                }"
                @click="switchComb.active = item.value"
              >
                {{ item.label }}
              </span>
            </template>
          </var-space>

          <div class="panel__main-desc" v-show="switchComb.active === 1">
            {{ videoInfo.summary }}

            <div class="mt-[12px]">
              <var-space>
                <var-chip v-for="item in videoInfo.tagInfo" :key="item" class="panel__main-chip">
                  {{ item }}
                </var-chip>
              </var-space>
            </div>
          </div>

          <div class="panel__main-series mt-[12px]" v-show="switchComb.active === 2">
            <series-episodes
              :videoId="playerStore.state.videoInfo.videoid"
              :episodeList="episodeList"
              :currentEpisode="currentEpisode"
              @select-episode="handleSelectEpisode"
            />
          </div>
        </div>
        <div v-show="switchComb.active === 1">
          <recom-video :video-id="videoInfo.videoid" :title="$t('you_might_like')" />
        </div>
      </div>
    </var-floating-panel>
  </var-style-provider>
</template>

<script setup lang="ts">
import { TVInfo, EpisodeType, apiDeleteCollection, apiCollectionVideo } from '@/apis/video'
import { playerStore } from '../store/index'
import { useAppRouter } from '@/use'
import StarIconActive from '@/assets/images/star--active.png'
import StarIcon from '@/assets/images/star.png'
import { EVENT_KEY, useEmit } from '../hooks/useMitt'
import { VNode } from 'vue'
import { i18n } from '@/i18n'

const props = withDefaults(
  defineProps<{
    videoInfo: TVInfo
    episodeList: EpisodeType[]
    currentEpisode?: EpisodeType
    anchors?: number[]
    teleport?: string | VNode | Element
    anchor?: number
  }>(),
  {
    anchors: () => [0, window.innerHeight * 0.45, window.innerHeight * 1],
    episodeList: () => [],
    anchor: 0,
  }
)

const emits = defineEmits<{
  (e: 'update:videoInfo', value: TVInfo): void
}>()

const { pushStack } = useAppRouter()

const computedAnchor = computed({
  get() {
    return props.anchor
  },
  set(newVal: number) {
    useEmit(EVENT_KEY.SET_FLOATING_PANEL, newVal)
  },
})
const switchComb = reactive({
  active: 1,
  tabList: [
    { label: i18n.global.t('description'), value: 1 },
    { label: i18n.global.t('episodes'), value: 2 },
  ],
})

/** 收藏/取消收藏 */
async function handleToggleCollect() {
  if (props.videoInfo.isCollect) {
    await apiDeleteCollection({
      ids: [props.videoInfo.videoid],
      isAllDel: 0,
    })
  } else {
    await apiCollectionVideo({ videoid: props.videoInfo.videoid })
  }
  emits('update:videoInfo', {
    ...props.videoInfo,
    isCollect: !props.videoInfo.isCollect,
  })
}

const handleSelectEpisode = (episodeId: string) => {
  useEmit(EVENT_KEY.SELECT_EPISODE, { episodeId })
}
</script>

<style lang="less" scoped>
:deep(.var-floating-panel) {
  background-color: var(--dark-bg-color);
}
.panel {
  padding: 0 10px;
  .panel__top {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    color: var(--dark-font-color);
  }
  .panel__main {
    margin-top: 16px;
    .panel__main-item {
      color: var(--dark-font-color);
      font-weight: 500;
      font-size: 16px;
    }
    .panel__main-item--noactive {
      color: var(--dark-font-secondary-color);
    }
    .panel__main-desc {
      color: var(--dark-font-secondary-color);
      font-size: 14px;
      line-height: 17px;
      margin-top: 8px;
      .panel__main-chip {
        color: var(--dark-font-color);
        background-color: var(--dark-bg-layer-1);
      }
    }
  }
}
</style>
