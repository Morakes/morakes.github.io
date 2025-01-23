<template>
  <div class="comment">
    <var-image :src="item.avatar" round width="42" height="42" radius="50%" fit="cover" />
    <div class="comment-content">
      <div class="username">{{ item.nickName }}</div>
      <div class="text">{{ item.content }}</div>

      <div class="bottom">
        <span class="time">{{ timeAgo(item.createTime) }}</span>
        <span class="reply ml-4" @click="handleReply($event)">{{ $t('reply') }}</span>
        <span class="reply ml-4" @click="handleDelete()" v-if="item.userid === userInfo?.userid">
          {{ $t('delete') }}
        </span>
      </div>

      <reply-item ref="replyRef" :comment="item" :episodeid="episodeid" :videoid="videoid" />
    </div>
    <div class="comment-like">
      <var-image
        :src="item.selfIsLike ? RedHeartActive : RedHeart"
        :width="16"
        @click="handleLike(item)"
      />
      <span>{{ item.likeNum }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timeAgo } from '@/utils/common'
import RedHeart from '@/assets/images/red-heart.png'
import RedHeartActive from '@/assets/images/red-heart--active.png'
import { apiDeleteComment, apiThumbsDown, apiThumbsUp, CommentType } from '@/apis/video'
import { ModuleProvideReply, useInject } from '../hooks/useProvide'
import ReplyItem from './ReplyItem.vue'
import { ComponentInstance } from 'vue'
import { useUserStore } from '@/store'
import { Dialog } from '@varlet/ui'
import { i18n } from '@/i18n'
const { userInfo } = storeToRefs(useUserStore())

const injectData = useInject(ModuleProvideReply)
const props = defineProps<{
  item: CommentType
  videoid?: string
  episodeid?: string
}>()

const replyRef = ref<ComponentInstance<typeof ReplyItem>>()

// 点赞评论
const handleLike = async (item: CommentType) => {
  if (item.selfIsLike) {
    await apiThumbsDown({
      commentid: item.id,
      replyid: item.id,
    })
    item.likeNum--
  } else {
    await apiThumbsUp({
      commentid: item.id,
      replyid: item.id,
    })
    item.likeNum++
  }
  item.selfIsLike = !item.selfIsLike
}

// 回复评论
const handleReply = (e: MouseEvent) => {
  // 禁止冒泡
  e.stopPropagation()
  injectData.focusInput({
    type: 'reply',
    commentid: props.item.id,
    replyid: '',
    // placeholder: `回复@${props.item.nickName}：`,
    placeholder: i18n.global.t('reply_placeholder', [props.item.nickName]),
  })
}

const handleDelete = () => {
  Dialog({
    message: i18n.global.t('delete_tip'),
    confirmButtonText: i18n.global.t('confirm'),
    cancelButtonText: i18n.global.t('cancel'),
    async onConfirm() {
      await apiDeleteComment({ commentid: props.item.id, replyid: '' })

      injectData.commentList.value = injectData.commentList.value.filter(
        (comment) => comment.id !== props.item.id
      )
    },
  })
}
</script>
<style lang="less" scoped>
.comment {
  display: flex;
  margin-bottom: 20px;
  align-items: start;
  width: 100%;
  .comment-content {
    flex: 1;
    margin-left: 12px;
    .username {
      font-size: 14px;
      color: var(--font-tip-color);
      margin-bottom: 4px;
    }

    .text {
      font-size: 14px;
      color: var(--font-color);
      margin-bottom: 6px;
    }

    .bottom {
      .time {
        font-size: 12px;
        color: var(--font-tip-color);
      }

      .reply {
        font-size: 12px;
        color: var(--font-secondary-color);
        cursor: pointer;
      }
    }
  }
  .comment-like {
    position: relative;
    top: 20px;
    font-size: 12px;
    text-align: center;
    color: var(--font-tip-color);
  }
}
</style>
