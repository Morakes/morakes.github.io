<template>
  <div class="interaction-bar">
    <div class="interaction-item">
      <var-image
        :src="videoInfo.isLike ? RedHeartIconActive : RedHeartIcon"
        height="25px"
        @click="handleLike"
      />
      <span class="count">{{ videoInfo.likeCount }}</span>
    </div>

    <div class="interaction-item" @click="handleOpenComments">
      <var-image :src="CommentIcon" height="25px" />
      <span class="count">{{ currentEpisode?.commentCount }}</span>
    </div>

    <div class="interaction-item">
      <var-image
        :src="videoInfo.isCollect ? BigStarIconActive : BigStarIcon"
        height="25px"
        @click="handleCollect"
      />
      <span class="count">{{ videoInfo.collectCount }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RedHeartIconActive from '@/assets/images/red-heart--active.png'
import RedHeartIcon from '@/assets/images/red-heart.png'
import CommentIcon from '@/assets/images/comment.png'
import BigStarIconActive from '@/assets/images/big-star--active.png'
import BigStarIcon from '@/assets/images/big-star.png'
import { useEmit, EVENT_KEY } from '@/components/h5-video/hooks/useMitt'
import { playerStore } from '../store/index'

const { currentEpisode, videoInfo } = toRefs(playerStore.state)
// 点赞按钮点击
function handleLike() {
  useEmit(EVENT_KEY.HEART_CLICK)
}
function handleCollect() {
  useEmit(EVENT_KEY.COLLECT_CLICK)
}

function handleOpenComments() {
  useEmit(EVENT_KEY.COMMENT_OPEN)
}
</script>
<style lang="less" scoped>
.interaction-bar {
  position: absolute;
  right: 15px;
  bottom: 65px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 101;
}

.interaction-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--dark-font-color);
  gap: 4px;

  .icon-wrapper {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
  }

  .count {
    font-size: 12px;
  }
}
</style>
