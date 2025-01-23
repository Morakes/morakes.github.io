<template>
  <div class="reply" v-if="isShowReply">
    <div class="reply-box">
      <div v-for="item in replyList" :key="item.id" class="reply-item">
        <var-image :src="item.avatar" round width="20" height="20" radius="50%" fit="cover" />
        <div class="comment-content">
          <div class="username">{{ item.nickName }}</div>
          <div class="text">{{ item.content }}</div>

          <div class="bottom">
            <span class="time">{{ timeAgo(item.createTime) }}</span>
            <span class="reply ml-4" @click="handleReply($event, item)">{{ $t('reply') }}</span>
            <span
              class="reply ml-4"
              @click="handleDelete(item)"
              v-if="item.userid === userInfo?.userid"
            >
              {{ $t('delete') }}
            </span>
          </div>
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
    </div>
    <div class="handler">
      <div class="expand-more" v-show="!finished" @click="getMoreReply">
        <span>{{ expandText }}</span>
        <var-icon name="chevron-down" size="24" />
      </div>

      <div class="fold" v-show="isFoldReply" @click="resetData">
        <span>{{ $t('collapse') }}</span>
        <var-icon name="chevron-up" size="24" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  apiDeleteComment,
  apiGetReplyList,
  apiThumbsDown,
  apiThumbsUp,
  CommentType,
  ReplyType,
} from '@/apis/video'
import { timeAgo } from '@/utils/common'
import RedHeart from '@/assets/images/red-heart.png'
import RedHeartActive from '@/assets/images/red-heart--active.png'
import { ModuleProvideReply, useInject } from '../hooks/useProvide'
import { useUserStore } from '@/store'
import { Dialog } from '@varlet/ui'
import { i18n } from '@/i18n'

const { userInfo } = storeToRefs(useUserStore())

const props = defineProps<{
  comment: CommentType
  videoid?: string
  episodeid?: string
}>()

const injectData = useInject(ModuleProvideReply)

const replyList = ref<ReplyType[]>([])
const finished = ref(false)

// 显示回复组件
const isShowReply = computed(() => {
  return props.comment.replyCount > 0
})

// 展开回复文案
const expandText = computed(() => {
  let result = ''
  if (!isShowReply.value) return result

  if (replyList.value.length <= 0) {
    result = i18n.global.t('expand_reply', [props.comment.replyCount])
  } else if (replyList.value.length >= props.comment.replyCount) {
    result = ''
  } else {
    result = i18n.global.t('expand_more')
  }
  return result
})

// 显示收起回复
const isFoldReply = computed(() => {
  return props.comment.replyCount > 0 && replyList.value.length
})

const page = reactive({
  page: 0,
  pagesize: 10,
  totalPage: 0,
  total: 0,
})

/**
 * 获取更多回复
 */
const getMoreReply = async () => {
  if (!props.episodeid && !props.videoid) return

  try {
    page.page++
    const res = await apiGetReplyList({
      commentid: props.comment.id,
      page: page.page,
      pagesize: page.pagesize,
      videoid: props.videoid!,
      episodeid: props.episodeid!,
    })

    replyList.value = replyList.value.concat(res.data.list)
    page.totalPage = res.data.totalPage

    if (page.page >= page.totalPage) {
      finished.value = true
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * 点赞
 * @param item
 */
const handleLike = async (item: ReplyType) => {
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

/**
 * 插入回复
 * @param data
 */
// const insertReply = (data: any) => {
//   replyList.value.unshift({
//     id: data.replyid,
//     nickName: userInfo.value!.nickname,
//     avatar: userInfo.value!.avatar,
//     createTime: data.createTime,
//     content: data.content,
//     likeNum: 0,
//     selfIsLike: false,
//     userid: userInfo.value!.userid,
//     playTime: 0,
//     replyid: data.replyid,
//     replyUserid: userInfo.value!.userid,
//   })
// }

/**
 * 回复评论的评论回复
 * @param item
 */
const handleReply = (e: MouseEvent, item: ReplyType) => {
  // 禁止冒泡
  e.stopPropagation()

  injectData.focusInput({
    type: 'reply',
    commentid: '',
    replyid: item.id,
    placeholder: i18n.global.t('reply_placeholder', [item.nickName]),
  })
}

/**
 * 删除回复
 * @param data
 */
const handleDelete = (data: ReplyType) => {
  Dialog({
    message: i18n.global.t('delete_tip'),
    confirmButtonText: i18n.global.t('confirm'),
    cancelButtonText: i18n.global.t('cancel'),
    onConfirm: async () => {
      await apiDeleteComment({
        commentid: '',
        replyid: data.id,
      })
      replyList.value = replyList.value.filter((item) => item.id !== data.id)

      injectData.commentList.value.find((item) => {
        if (item.id === props.comment.id) {
          item.replyCount--
        }
      })
    },
  })
}

const resetData = () => {
  replyList.value = []
  finished.value = false
  page.page = 0
  page.totalPage = 0
  page.total = 0
}
</script>

<style lang="less" scoped>
.reply {
  width: 100%;
  .reply-box {
    .reply-item {
      display: flex;
      align-items: start;
      margin-top: 10px;
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
        left: 16px;
        font-size: 12px;
        text-align: center;
        color: var(--font-tip-color);
      }
    }
  }
  .handler {
    margin-top: 14px;
    display: flex;
    gap: 12px;

    .expand-more {
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    .fold {
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
