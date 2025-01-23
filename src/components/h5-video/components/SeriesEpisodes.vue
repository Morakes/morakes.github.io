<template>
  <div class="anchor-list">
    <var-space>
      <template v-for="item in groupEp" :key="item.label">
        <span
          class="anchor-list__label"
          :class="{
            'anchor-list__label--active': item.label === activeLabel,
          }"
          @click="activeLabel = item.label"
          :href="`#${item.label}`"
        >
          {{ item.label }}
        </span>
      </template>
    </var-space>
  </div>

  <!-- 剧集方块列表 -->
  <div class="episode-list">
    <template v-for="item in episodeList" :key="item.episodeid">
      <div
        class="chip"
        :class="{ 'chip--vip': item.lockStatus === LOCK_STATUS.LOCKED }"
        @click="handleSelectEpisode(item.episodeid)"
      >
        <template v-if="item.episodeid === currentEpisode?.episodeid">
          <var-image :src="EpisodePlayIcon" width="20px" height="20px" />
        </template>
        <template v-else>
          {{ item.episodeNumber }}
        </template>
        <img
          class="chip__unlock"
          :src="UnLockIcon"
          alt="unlock"
          v-show="item.lockStatus === LOCK_STATUS.LOCKED"
        />
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { EpisodeType } from '@/apis/video'
import EpisodePlayIcon from '@/assets/images/episode-play.gif'
import UnLockIcon from '@/assets/images/unlock.png'
import { LOCK_STATUS } from '@/constant/common'

type EpisodeGroup<T> = {
  label: string
  group: T[]
}

const props = withDefaults(
  defineProps<{
    episodeList: EpisodeType[]
    currentEpisode?: EpisodeType
    videoId: string
  }>(),
  {
    episodeList: () => [],
  }
)
const emits = defineEmits<{
  (e: 'selectEpisode', episodeId: string): void
}>()

const activeLabel = ref<string>()
const groupEp = ref<EpisodeGroup<any>[]>()

watchEffect(() => {
  if (!props.episodeList.length) return
  groupEp.value = getGroupEpisodeList(props.episodeList)
  activeLabel.value = groupEp.value[0].label
})

// 将episodeList分组 30个一组 group为数组 label为 1-30 31-60这样子
function getGroupEpisodeList(list: any[], singleGroupNum = 30) {
  return list.reduce((acc, cur, index) => {
    const groupIndex = Math.floor(index / singleGroupNum)

    acc[groupIndex] = acc[groupIndex] || { label: '', group: [] }
    acc[groupIndex].group.push(cur)
    acc[groupIndex].label = `${groupIndex * singleGroupNum + 1}-${index + 1}`
    return acc
  }, [] as EpisodeGroup<any>[]) as EpisodeGroup<any>[]
}

function handleSelectEpisode(episodeId: string) {
  emits('selectEpisode', episodeId)
}
</script>
<style lang="less" scoped>
.anchor-list {
  .anchor-list__label {
    color: var(--dark-font-secondary-color);
    font-size: 14px;
  }
  .anchor-list__label--active {
    color: var(--dark-font-color);
  }
}
.episode-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;

  gap: 10px;
  .chip {
    position: relative;
    color: var(--dark-font-color);
    background-color: var(--dark-bg-layer-1);
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    .chip__unlock {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 20%;
      height: auto;
    }
  }
  .chip--vip {
    background-color: rgba(253, 192, 50, 0.08);
  }
  .chip--unlock {
    background-color: rgba(253, 192, 50, 0.08);
  }
}
</style>
