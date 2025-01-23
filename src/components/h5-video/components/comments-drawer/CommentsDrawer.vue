<template>
  <theme-var-popup
    position="bottom"
    v-model:show="show"
    @click-overlay="handleClose"
    :z-index="999"
  >
    <div class="comments-drawer">
      <div class="drawer-header">
        <span>{{ $t('comment_num', [commentCount]) }}</span>
        <div class="close-icon" @click="handleClose">
          <var-icon name="chevron-down" />
        </div>
      </div>

      <div class="comments-list" ref="commentRef">
        <var-list
          :loading="loading"
          :finished="finished"
          @load="handleLoad"
          loading-text="loading..."
          finished-text="no more"
          :immediate-check="false"
        >
          <template v-for="item in commentList" :key="item.id">
            <comment-item :item="item" :episodeid="episodeId" :videoid="videoId" />
          </template>
        </var-list>
      </div>

      <!-- 评论输入框 -->
      <var-style-provider
        :style-vars="{
          '--field-decorator-line-size': '0px',
          '--field-decorator-line-focus-size': '0px',
          '--button-border-radius': '8px',
        }"
      >
        <div class="comment-input" ref="sendAreaRef">
          <div
            v-show="!isShowSendBtn"
            class="replace-input"
            @click="focusInput({ type: 'comment', placeholder: '评论' })"
          >
            {{ $t('comment_placeholder') }}
          </div>

          <div v-show="isShowSendBtn" class="send">
            <var-input
              v-model="commentText"
              ref="inputRef"
              :placeholder="payload.placeholder"
              textarea
              class="bg-[var(--bg-layer-2)] rounded-[8px] flex-1"
              focus-color="var(--dark-font-secondary-color)"
              :rows="3"
              :hint="true"
            />
            <var-button
              :round="false"
              color="var(--color-primary-orange)"
              :elevation="0"
              icon-container
              @click="handleSubmit"
            >
              <var-image src="@/assets/images/send.png" :width="14" />
            </var-button>
          </div>
        </div>
      </var-style-provider>
    </div>
  </theme-var-popup>
</template>

<script lang="ts" setup>
import { useClickOutside } from '@varlet/use'
import { EVENT_KEY, useEmit, useOn } from '../../hooks/useMitt'
import CommentItem from './components/CommentItem.vue'
import { useComment } from './hooks/useComment'
import { useProvide, ModuleProvideReply } from './hooks/useProvide'

interface Props {
  commentCount?: number
  videoId?: string
  episodeId?: string
  playTime: number
}
const props = defineProps<Props>()
const { videoId, episodeId, playTime } = toRefs(props)

const {
  isShowSendBtn,
  commentRef,
  inputRef,
  commentText,
  loading,
  finished,
  commentList,
  payload,
  sendAreaRef,
  blurInput,
  handleSubmit,
  focusInput,
  resetData,
  handleLoad,
} = useComment({ videoId, episodeId, playTime })

useProvide(ModuleProvideReply, {
  focusInput,
  commentList,
})

const show = ref(false)

watch([() => props.episodeId, show], () => {
  if (show.value && props.episodeId) {
    // 第一次进入or剧集改变 重置数据
    resetData()
  }

  if (show.value) {
    // 禁止滑动
    useEmit(EVENT_KEY.ALLOW_TOUCH_MOVE, false)
  } else {
    useEmit(EVENT_KEY.ALLOW_TOUCH_MOVE, true)
  }
})

useClickOutside(
  () => sendAreaRef.value!,
  'click',
  () => {
    blurInput()
  }
)

// 关闭弹窗
const handleClose = () => {
  show.value = false
  blurInput()
}

// 订阅
const subscribe = () => {
  useOn(EVENT_KEY.COMMENT_OPEN, () => {
    show.value = true
  })
}

onMounted(() => {
  subscribe()
})
</script>

<style lang="less" scoped>
.comments-drawer {
  background: var(--bg-layer-1);
  height: 70vh;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;

  .drawer-header {
    padding: 16px;
    border-bottom: 1px solid var(--bg-layer-2);
    display: flex;
    position: relative;
    color: var(--font-color);

    .close-icon {
      position: absolute;
      right: 16px;
      top: 5px;
      font-size: 24px;
      cursor: pointer;
    }
  }

  .comments-list {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  .comment-input {
    padding: 12px;
    border-top: 1px solid var(--bg-layer-2);
    .replace-input {
      height: 40px;
      width: 100%;
      background-color: var(--bg-layer-2);
      color: var(--font-disable-color);
      line-height: 40px;
      border-radius: 8px;
      padding-left: 12px;
    }
    .send {
      display: flex;
      align-items: end;
      gap: 10px;
    }
  }
}
</style>
