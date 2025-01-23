<template>
  <router-stack>
    <var-style-provider
      :style-vars="{ '--cell-padding': '24px 12px' }"
    >
      <app-header>
        <template #left>
          <app-back />
          {{ $t('System Settings') }}
        </template>
      </app-header>

      <div class="p-[16px]">
        <var-paper :elevation="1">
          <template v-for="(item, index) in useConfig" :key="index">
            <theme-var-cell :border="useConfig.length - 1 !== index" ripple>
              {{ item.name }}
              <template v-for="(slot, name) in item.$slots" #[name]>
                <component :is="slot" :key="name" />
              </template>
            </theme-var-cell>
          </template>
        </var-paper>

        <var-paper :elevation="1" class="mt-[16px]">
          <template v-for="(item, index) in systemConfig" :key="index">
            <theme-var-cell :border="systemConfig.length - 1 !== index" ripple>
              {{ item.name }}
              <template v-for="(slot, name) in item.$slots" #[name]>
                <component :is="slot" :key="name" />
              </template>
            </theme-var-cell>
          </template>
        </var-paper>

        <var-button size="large" block class="mt-[16px]" color="var(--bg-layer-2)" :elevation="0" @click="logout">{{ $t('logout') }}</var-button>
      </div>

    </var-style-provider>

    <avatar-popup />

  </router-stack>
</template>
<script lang="tsx" setup>
import { Avatar, Dialog, Icon } from '@varlet/ui'
import "@varlet/ui/es/switch/switch.css"
import AvatarPopup from '@/components/user-page/avatar-popup/index.vue'
import { useAppRouter } from '@/use'
import { useAvatarPopup } from '@/components/user-page/avatar-popup/hooks/useAvatarPopup'
import { useUserStore } from '@/store'
import { useLoginStore } from '@/store'
import { i18n } from '@/i18n'

const { togglePopup } = useAvatarPopup()
const { pushStack, router } = useAppRouter()
const { userInfo } = storeToRefs(useUserStore())
const loginStore = useLoginStore()

// const switchRef = ref(true)

const useConfig = computed(() => [
  {
    name: i18n.global.t('avatar'),
    $slots: {
      extra: <Avatar src={userInfo.value?.avatar} round fit="cover" onClick={togglePopup} />,
    },
  },
  {
    name: 'ID',
    $slots: {
      extra: <div>{userInfo.value?.userid}</div>,
    },
  },
  {
    name: i18n.global.t('nickname'),
    $slots: {
      extra: <div class="flex" onClick={() => pushStack('edit-nickname', { nickname: userInfo.value?.nickname })}>
        {userInfo.value?.nickname}
        <Icon name="chevron-right" />
      </div>,
    },
  }
])

const systemConfig = computed(() => [
  // {
  //   name: '自动购买管理',
  //   $slots: {
  //     extra: <Switch v-model={switchRef.value} />
  //   },
  // },
  // {
  //   name: '清除缓存',
  //   $slots: {
  //     extra: <div class='flex'>
  //       {'123.2MB'}
  //       <Icon name="chevron-right" />
  //     </div>
  //   }
  // },
  {
    name: i18n.global.t('version'),
    $slots: {
      extra: <div>1.0.0</div>,
    }
  }
])

function logout() {
  Dialog({
    title: '',
    message: i18n.global.t('logout_tip'),
    confirmButton: true,
    cancelButton: true,
    cancelButtonText: i18n.global.t('cancel'),
    confirmButtonText: i18n.global.t('confirm'),
    onConfirm: () => {
      loginStore.logout()
      router.push('/pages/user').then(() => {
        window.location.reload()
      })
    }
  })
}

</script>
