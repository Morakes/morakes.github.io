<template>
  <var-app-bar
    color="var(--task-bg-layer)"
    text-color="var(--font-color)"
    :elevation="0"
    safe-area-top
    :title="$t('Rewards')"
    title-position="left"
  >
    <template #right>
      <div class="chip">
        <var-image :src="GoldCoin" :heihgt="30" :width="30" />
        <span>{{ userInfo?.coinBalance }}</span>
      </div>
    </template>
  </var-app-bar>
  <div class="root">
    <var-style-provider
      :style-vars="{
        '--button-disabled-color': 'var(--color-primary-orange)',
        '--button-disabled-text-color': '',
      }"
    >
      <div
        class="reward-register"
        :style="{
          background: `url(/src/assets/images/reward-bg${isDark ? '-dark' : ''}.png) no-repeat`,
          backgroundSize: 'contain',
        }"
      >
        <var-space class="reward-check" direction="column" :size="4">
          <span>{{ signinInfo?.title }}</span>
          <span class="reward-tip">
            {{ signinInfo?.desc }}
          </span>
        </var-space>

        <!-- 签到 -->
        <div class="reward-chip">
          <template v-for="item in signinInfo?.coin" :key="item">
            <div class="chip-item" :class="{ 'chip-item--active': item.signed }">
              {{ item.title }}
              <var-image :src="GoldCoin" height="30px" width="auto" />
              <div>
                <div v-if="item.signed" class="text-[--dark-font-color]">{{ item.coin }}</div>
                <div v-else class="text-xs text-[--font-tip-color]">{{ item.coin }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- 任务列表 -->
      <div class="task-list">
        <header class="text-[--font-color] text-lg font-600">{{ $t('mission_list') }}</header>
        <template v-for="item in taskList" :key="item">
          <div class="task-item">
            <var-image
              src="../../../assets/images/task-avatar.png"
              :width="40"
              :height="40"
              fit="cover"
            />

            <var-space direction="column" class="flex-1">
              <div class="flex items-center">
                {{ item.title }}
                <div class="chip">
                  <var-image :src="GoldCoin" :heihgt="25" :width="25" />
                  <span class="text-[--color-primary-orange]">+{{ item.reward.amount }}</span>
                </div>
              </div>
              <div class="text-[var(--font-tip-color)] text-xs">{{ item.desc }}</div>
              <var-progress
                :value="(item.progressBar.cur / item.progressBar.total) * 100"
                track-color="var(--bg-layer-2)"
                style="width: 60%"
                :label="true"
              >
                <div class="text-xs text-[--font-secondary-color]">
                  {{ `${item.progressBar.cur}/${item.progressBar.total}` }}
                </div>
              </var-progress>
            </var-space>

            <var-button
              type="primary"
              text-color="var(--dark-font-color)"
              :elevation="0"
              @click="
                () => {
                  item.progressBar.cur === item.progressBar.total && handleFinish(item.missionid)
                }
              "
              style="width: 80px"
              :disabled="!!item.isFinished"
              :style="{ opacity: item.isFinished ? 0.4 : 1 }"
            >
              <template v-if="item.progressBar.cur === item.progressBar.total">
                {{ $t(TASK_STATUS['GET']) }}
              </template>
              <template v-if="item.progressBar.cur < item.progressBar.total">
                {{ $t(TASK_STATUS['PENDING']) }}
              </template>
              <template v-if="item.isFinished">
                {{ $t(TASK_STATUS['DONE']) }}
              </template>
            </var-button>
          </div>
        </template>
      </div>

      <!-- 弹窗 -->
      <theme-var-popup :show="showToast" position="center" :overlay="false">
        <div class="popup-content">
          <var-space direction="column" align="center">
            <var-image :src="GoldCoin" />
            <div class="text-5xl font-800">{{ `+${coins}` }}</div>
          </var-space>
        </div>
      </theme-var-popup>
    </var-style-provider>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store'
import GoldCoin from '@/assets/images/gold-coin.png'
import { useTask } from '@/use/useTask'
import ThemeVarPopup from '@/components/theme-comp/ThemeVarPopup.vue'
import { TASK_STATUS } from '@/constant/common'
import { useUserStore } from '@/store'
import { Toast } from '@/components/Toast'

const { userInfo } = storeToRefs(useUserStore())
const {
  signinInfo,
  taskList,
  fetchSignInInfo,
  fetchTaskList,
  sendSignin,
  checkSignin,
  finishTask,
} = useTask()
const showToast = ref(false)
const coins = ref(0)
const { isDark } = storeToRefs(useGlobalStore())

function handleFinish(id: string) {
  finishTask(id)
    .then(() => {
      fetchTaskList()
    })
    .catch((err) => {
      Toast({
        content: err.message as string,
      })
    })
}

onMounted(async () => {
  fetchTaskList()
  fetchSignInInfo()

  if (!checkSignin()) {
    sendSignin().then((res) => {
      fetchSignInInfo()

      coins.value = res.data.reward.amount
      showToast.value = true

      setTimeout(() => {
        showToast.value = false
      }, 3000)
    })
  }
})
</script>
<style lang="less" scoped>
.chip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  color: var(--font-color);
  border-radius: 100px;
  background-color: var(--bg-layer-1);
  padding: 0 10px;
}
.root {
  height: 100%;
  background-color: var(--task-bg-layer);
  padding: 0 16px;

  .reward-register {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 40px 12px 0 12px;
    .reward-check {
      color: var(--font-color);
      font-size: 14px;
      .reward-tip {
        color: var(--font-tip-color);
        font-size: 12px;
      }
    }
    .reward-chip {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;
      column-gap: 3%;
      row-gap: 8px;
      :last-child {
        flex: 1;
      }
      .chip-item {
        flex-basis: 22%;
        padding: 4px;
        height: 76px;
        background: var(--bg-layer-2);
        color: var(--font-color);
        border-radius: 8px;
        display: flex;
        row-gap: 4px;
        flex-direction: column;
        align-items: center;
      }
      .chip-item--active {
        background-color: var(--color-primary-orange);
        color: var(--dark-font-color);
      }
    }
  }

  .task-list {
    background-color: var(--bg-layer-1);
    border-radius: 8px;
    padding: 12px;
    .task-item {
      margin-top: 16px;
      display: flex;
      align-items: center;
      column-gap: 8px;
      color: var(--font-color);
    }
  }
}

:deep(.popup-block) {
  background-color: transparent;
}
.popup-content {
  border-radius: 30px;
  width: 140px;
  height: 140px;
  padding: 12px;
  background-color: rgba(#000000, 0.6);
  color: var(--color-primary-orange);
}
</style>
