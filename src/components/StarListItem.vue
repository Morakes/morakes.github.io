<template>
  <custom-skeleton :loading="loading" avatar :rows="3">
    <var-style-provider
      :style-vars="{
        '--button-border-radius': '8px',
      }"
    >
      <var-paper :elevation="0" :height="132" class="card">
        <var-image
          radius="4"
          width="109px"
          height="145px"
          fit="cover"
          class="card-cover"
          :src="data.cover"
        />
        <div class="card-right">
          <div>
            <var-ellipsis
              :tooltip="false"
              style="max-width: 200px"
              class="text-md text-[var(--font-color)]"
            >
              {{ data.videoName }}
            </var-ellipsis>
          </div>
          <div>
            <var-ellipsis
              :tooltip="false"
              :line-clamp="2"
              style="max-width: 200px"
              class="text-xs mt-[8px] text-[var(--font-secondary-color)]"
            >
              {{ data.summary }}
            </var-ellipsis>
          </div>
          <div class="card-footer">
            <div class="text-xs">
              {{ `${data.totalEpisodeNum} ${$t('episodes')}` }}
            </div>
            <div class="flex gap-[8px]">
              <div class="card-footer-delete" @click="isOpenDeletePopup = !isOpenDeletePopup">
                <var-image src="@/assets/images/dustbin.png" class="w-[14px] h-[14px]" />
              </div>

              <var-button
                size="small"
                text-color="var(--dark-font-color)"
                color="linear-gradient(90deg, #FF892E 0%, #FFA526 100%)"
                @click="goPlayer"
                >{{ $t('play') }}
              </var-button>
            </div>
          </div>
        </div>
      </var-paper>

      <theme-dialog
        v-model:show="isOpenDeletePopup"
        title=""
        @confirm="handleConfirm"
        :cancel-button-text="$t('cancel')"
        :confirm-button-text="$t('confirm')"
      >
        {{ $t('delete_video') }}
      </theme-dialog>
    </var-style-provider>
  </custom-skeleton>
</template>

<script lang="ts" setup>
import { CollectVideoType } from '@/apis/video'
import { useAppRouter } from '@/use'

interface Props {
  data: CollectVideoType
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'delete', data: CollectVideoType): void
}>()

const { pushStack } = useAppRouter()

const loading = ref(true)
const isOpenDeletePopup = ref(false)

const handleConfirm = () => {
  isOpenDeletePopup.value = false
  emits('delete', props.data)
}

const goPlayer = () => {
  // router.push({
  //   path: '/pages/home/player',
  //   query: {
  //     videoId: props.data.videoid,
  //   },
  // })
  pushStack('player', { videoId: props.data.videoid })
}

const onDispose = watchEffect(() => {
  if (props.data) {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
})

onUnmounted(() => {
  onDispose()
})
</script>

<style lang="less" scoped>
:deep(.var-paper) {
  overflow: visible;
  padding: 12px;
}
.card {
  background-color: var(--bg-layer-3);
  margin-top: 25px;
  display: flex;
  gap: 16px;
  &-cover {
    position: relative;
    top: -37px;
    flex-shrink: 0;
  }
  &-right {
    flex: 1;
    display: block;
    position: relative;
    .card-footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-delete {
        padding: 2px;
        background: var(--color-body);
        border-radius: 8px;
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
