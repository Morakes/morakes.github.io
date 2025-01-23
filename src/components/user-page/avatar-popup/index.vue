<template>
  <var-popup position="bottom" v-model:show="isOpenAvatarPopup" @closed="closePopup">
    <div class="popup-block">
      <var-cell border ripple>
        <upload-media
          v-model:value="files"
          hide-list
          :multiple="false"
          :upload-type="UPLOAD_TYPE_ENUM.AVATAR"
        >
          {{ $t('pick_images') }}
        </upload-media>
      </var-cell>
      <var-button
        block
        :elevation="0"
        color="var(--bg-layer-1)"
        text-color="var(font-white-color)"
        size="large"
        class="mt-[10px]"
        @click="closePopup"
        >{{ $t('cancel') }}</var-button
      >
    </div>
  </var-popup>
</template>

<script lang="ts" setup>
import { UPLOAD_TYPE_ENUM } from '@/constant/common'
import { useAvatarPopup } from './hooks/useAvatarPopup'
import { useUserStore } from '@/store'
import { Toast } from '@/components/Toast'
import { i18n } from '@/i18n'

const { updateUserInfo } = useUserStore()
const { isOpenAvatarPopup, files, avatarUrl, closePopup, togglePopup } = useAvatarPopup()

watch(
  () => avatarUrl.value,
  () => {
    updateUserInfo({
      avatar: avatarUrl.value,
    }).then(() => {
      Toast({
        content: i18n.global.t('update_success'),
        duration: 1500,
      })
      togglePopup()
    })
  }
)
</script>

<style lang="less" scoped>
.popup-block {
  padding: 0 0 24px 0;
  height: 160px;
  background-color: var(--bg-layer-1);
}
</style>
