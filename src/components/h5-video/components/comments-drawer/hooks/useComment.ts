import { apiGetCommentList, apiPublishComment, apiReplyComment, CommentType } from '@/apis/video'

export interface PayloadType {
  type: 'comment' | 'reply'
  placeholder?: string
  commentid?: string
  replyid?: string
  insert?: (arg: any) => void
}

export function useComment({
  videoId,
  episodeId,
  playTime = ref(0),
}: {
  videoId: Ref<string | undefined>
  episodeId: Ref<string | undefined>
  playTime: Ref<number | undefined>
}) {
  const isShowSendBtn = ref(false)
  const commentRef = ref<HTMLDivElement>()
  const inputRef = ref<HTMLInputElement>()
  const sendAreaRef = ref<HTMLDivElement>()
  const commentText = ref('')
  const loading = ref(false)
  const finished = ref(false)
  const commentList = ref<CommentType[]>([])

  const page = reactive({
    page: 1,
    pageTotal: 0,
    total: 0,
    pagesize: 10,
  })

  const payload = reactive<PayloadType>({
    type: 'comment',
    placeholder: '',
    commentid: '',
    replyid: '',
    insert: () => {},
  })

  /** 提交评论&回复 */
  const handleSubmit = async () => {
    if (!commentText.value || !videoId.value || !episodeId.value) return

    try {
      if (payload.type === 'comment') {
        await submitComment()
      } else {
        await submitReply()
      }
      // 重置数据
      commentText.value = ''
      blurInput()
    } catch (error) {
      console.error(error)
    }
  }

  /** 提交评论 */
  const submitComment = async () => {
    await apiPublishComment({
      videoid: videoId.value!,
      episodeid: episodeId.value!,
      content: commentText.value,
      playTime: playTime.value!,
    })

    Snackbar.success('提交成功')
  }

  /** 提交回复 */
  const submitReply = async () => {
    await apiReplyComment({
      videoid: videoId.value!,
      episodeid: episodeId.value!,
      content: commentText.value,
      replyid: payload.replyid!,
      playTime: playTime.value!,
      commentid: payload.commentid!,
    })
    Snackbar.success('提交成功')
  }

  /** 获取评论列表 */
  const fetchComments = async () => {
    if (!videoId.value || !episodeId.value) {
      throw new Error('videoId or episodeId is empty')
    }

    loading.value = true
    try {
      const {
        data: { total, totalPage, list },
      } = await apiGetCommentList({
        videoid: videoId.value,
        episodeid: episodeId.value,
        page: page.page,
        pagesize: page.pagesize,
      })

      commentList.value = commentList.value.concat(list)
      page.pageTotal = totalPage
      page.total = total

      loading.value = false
      if (page.page >= page.pageTotal) {
        finished.value = true
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** 隐藏发送按钮 */
  const blurInput = () => {
    inputRef.value?.blur()
    isShowSendBtn.value = false
  }

  /**显示发送按钮 */
  const focusInput = (data: PayloadType) => {
    Object.assign(payload, data)

    isShowSendBtn.value = true
    nextTick(() => {
      inputRef.value?.focus()
    })
  }

  /** 重置数据 */
  const resetData = () => {
    nextTick(() => {
      commentRef.value?.scrollTo(0, 0)
    })

    commentList.value = []
    finished.value = false
    page.page = 1
    fetchComments()
  }

  /** 加载更多 */
  const handleLoad = () => {
    page.page++
    fetchComments()
  }

  return {
    isShowSendBtn,
    commentRef,
    inputRef,
    commentText,
    loading,
    finished,
    commentList,
    payload,
    sendAreaRef,
    handleSubmit,
    blurInput,
    focusInput,
    resetData,
    handleLoad,
  }
}
