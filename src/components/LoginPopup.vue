<template>
  <theme-var-popup position="bottom" :show="show" @close="handleClose" @click-overlay="handleClose">
    <div class="popup-block">
      <div class="relative text-center">
        <header class="text-xl text-[--font-color]">{{ $t('login_title') }}</header>
        <div class="absolute right-[0px] top-[-10px]" @click="handleClose">
          <var-icon name="window-close" />
        </div>
      </div>

      <var-style-provider
        :style-vars="{
          '--paper-background': 'var(--bg-layer-1)',
        }"
      >
        <div class="mt-20px color-[var(--font-size)]">
          <var-paper
            :elevation="1"
            :radius="8"
            ripple
            class="flex h-[48px] justify-center items-center mt-[16px] relative"
            @click="triggerGoogleLogin"
          >
            <var-image :src="Google" height="32px" width="32px" class="absolute left-[10px]" />
            {{ $t('sign_google') }}
          </var-paper>

          <var-paper
            :elevation="1"
            :radius="8"
            ripple
            class="flex h-[48px] justify-center items-center mt-[16px] relative"
            @click="triggerAppleLogin"
          >
            <var-image :src="Apple" height="32px" width="32px" class="absolute left-[10px]" />
            {{ $t('sign_apple') }}
          </var-paper>

          <var-paper
            :elevation="1"
            :radius="8"
            ripple
            class="flex h-[48px] justify-center items-center mt-[16px] relative"
            @click="triggerFbLogin"
          >
            <var-image :src="Facebook" height="32px" width="32px" class="absolute left-[10px]" />
            {{ $t('sign_facebook') }}
          </var-paper>
        </div>
      </var-style-provider>

      <div class="mt-[16px] text-center">
        登录即代表您同意
        <span class="text-color-[var(--color-primary-orange)]" @click="pushStack('protocol')">
          用户协议</span
        >
        和
        <span class="text-color-[var(--color-primary-orange)]" @click="pushStack('protocol')">
          隐私协议</span
        >
      </div>
    </div>
  </theme-var-popup>
</template>
<script lang="ts" setup>
import Google from '@/assets/images/google.png'
import Apple from '@/assets/images/apple.png'
import Facebook from '@/assets/images/facebook.png'
import GoogleAuth from '@/plugin/google-auth'
import AppleAuth from '@/plugin/apple-auth'
import FacebookAuth from '@/plugin/facebook-auth'
import { useAppRouter } from '@/use'
import { useFpjsStore } from '@/store/fpjs'
import { useLoginStore } from '@/store'
import { Dialog } from '@varlet/ui'

const { thirdPartLoginType } = storeToRefs(useLoginStore())
const fpjsStore = useFpjsStore()
const googleAuth = new GoogleAuth({})
const appleAuth = new AppleAuth()
const fbAuth = new FacebookAuth({})

interface Props {
  show: boolean
}

defineProps<Props>()
const emits = defineEmits(['update:show'])
const { pushStack } = useAppRouter()

const handleClose = () => {
  emits('update:show', false)
}

async function triggerGoogleLogin() {
  googleAuth
    .promptLogin(fpjsStore.deviceId)
    .then(() => {
      loginSuccess('google')
    })
    .catch((err) => {
      Dialog({
        title: '',
        message: err,
        cancelButton: false,
      })
    })
}
async function triggerAppleLogin() {
  appleAuth
    .promptLogin(fpjsStore.deviceId)
    .then(() => {
      loginSuccess('apple')
    })
    .catch((err) => {
      Dialog({
        title: '',
        message: err,
        cancelButton: false,
      })
    })
}

async function triggerFbLogin() {
  fbAuth
    .promptLogin(fpjsStore.deviceId)
    .then(() => {
      loginSuccess('facebook')
    })
    .catch((err) => {
      Dialog({
        title: '',
        message: err,
        cancelButton: false,
      })
    })
}

function loginSuccess(type: typeof thirdPartLoginType.value) {
  thirdPartLoginType.value = type
  emits('update:show', false)
}

onMounted(async () => {
  // 初始化 Google 登录
  await googleAuth.init()
  // 初始化 Apple 登录
  await appleAuth.init()
  // 初始化 Facebook 登录
  await fbAuth.init()
})
</script>

<style lang="less" scoped>
.popup-block {
  height: 330px;
  padding: 20px 16px;
  width: 100%;
}
</style>
