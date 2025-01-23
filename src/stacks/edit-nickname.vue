<template>
  <router-stack>
    <var-style-provider class="pt-[40px] px-[16px]">
      <app-header>
        <template #left>
          <app-back />
          {{ $t('edit_nickname') }}
        </template>
      </app-header>

      <var-input
        v-model="inputRef"
        variant="outlined"
        blur-color="transparent"
        class="bg-[var(--bg-layer-2)] rounded-[8px]"
        clearable
      />

      <div
        class="flex flex-col gap-[8px] mt-[16px] color-[var(--font-secondary-color)] line-height-normal"
      >
        <template v-for="item in $t('nickname_length_hint').split('\n')" :key="item">
          <span>
            {{ item }}
          </span>
        </template>
      </div>

      <var-button
        type="primary"
        block
        class="mt-[32px]"
        text-color="var(--dark-font-color)"
        size="large"
        @click="handleSave"
      >
        {{ $t('save') }}
      </var-button>
    </var-style-provider>
  </router-stack>
</template>
<script lang="ts" setup>
import { Toast } from '@/components/Toast'
import { i18n } from '@/i18n'
import { useUserStore } from '@/store'

const { updateUserInfo } = useUserStore()
const { userInfo } = storeToRefs(useUserStore())
const inputRef = ref()

const dospose = watchEffect(() => {
  inputRef.value = userInfo.value?.nickname
})

const handleSave = () => {
  updateUserInfo({ nickname: inputRef.value }).then(() => {
    Toast({
      content: i18n.global.t('update_success'),
      duration: 3000,
    })
  })
}

onUnmounted(() => {
  dospose()
})
</script>
<style lang="less" scoped></style>
