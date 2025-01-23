<template>
  <router-stack>
    <var-style-provider
      :style-vars="{
        '--field-decorator-line-size': '0px',
        '--field-decorator-line-focus-size': '0px',
      }"
    >
      <app-header>
        <template #left>
          <app-back />
          {{ $t('Feedback') }}
        </template>
      </app-header>

      <var-form ref="form" class="mt-[16px]">
        <var-space direction="column" size="5">
          <var-cell>
            <label class="block pb-4">
              <span class="text-red">*</span>
              <span class="text-lg">{{ $t('question_type') }}</span>
            </label>
            <var-space>
              <template v-for="item in qsList" :key="item.questionType">
                <var-chip
                  round
                  :color="
                    formData.questionType === item.questionType
                      ? 'var(--color-primary-orange)'
                      : 'var(--bg-layer-2)'
                  "
                  :text-color="
                    formData.questionType === item.questionType
                      ? 'var(--dark-font-color)'
                      : 'var(--font-color)'
                  "
                  @click="formData.questionType = item.questionType"
                >
                  {{ item.name }}
                </var-chip>
              </template>
            </var-space>
          </var-cell>

          <var-cell>
            <var-input
              class="bg-[var(--bg-layer-2)] rounded-[8px]"
              variant="outlined"
              :placeholder="$t('enter_content')"
              textarea
              blur-color="var(--dark-font-secondary-color)"
              v-model="formData.content"
              :rules="(val) => val?.length >= 5 || $t('enter_content_hint')"
              :validate-trigger="['onInput']"
            />
          </var-cell>

          <var-cell>
            <label class="block text-lg pb-4"> {{ $t('screenshot_problem') }} </label>
            <upload-media
              v-model:value="formData.imageList"
              :maxlength="3"
              :upload-type="UPLOAD_TYPE_ENUM.FEEDBACK"
            />
          </var-cell>

          <var-cell>
            <var-auto-complete
              variant="outlined"
              class="bg-[var(--bg-layer-2)] rounded-[8px]"
              :placeholder="$t('enter_contact')"
              :options="options"
              v-model="value"
              clearable
              :rules="[
                (val) => val.length > 0 || $t('enter_hint'),
                (val) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) ||
                  $t('enter_valid_email'),
              ]"
            />
          </var-cell>

          <var-cell>
            <var-button
              color="var(--color-primary-orange)"
              block
              text-color="var(--dark-font-color)"
              @click="handleSubmit"
            >
              {{ $t('submit') }}
            </var-button>
          </var-cell>
        </var-space>
      </var-form>

      <var-popup v-model:show="isShowFeedbackPopup">
        <div class="popup-block">
          <header class="text-xl text-center text-color-[var(--light-font-color)] font-600 pb-2">
            {{ $t('submit_success') }}
          </header>
          <template v-for="item in submitTooltip" :key="item">
            <div>
              {{ item }}
            </div>
          </template>

          <var-button
            block
            :elevation="0"
            color="var(--color-primary)"
            text-color="var(--dark-font-color)"
            class="mt-3"
            @click="pushParentRoute"
          >
            {{ $t('got_it') }}
          </var-button>
        </div>
      </var-popup>
    </var-style-provider>
  </router-stack>
</template>
<script lang="ts" setup>
import { Form } from '@varlet/ui'
import UploadMedia from '@/components/UploadMedia.vue'
import { useAutoComplete } from '@/use/useAutoCompelete'
import { UPLOAD_TYPE_ENUM } from '@/constant/common'
import { useAppRouter } from '@/use'
import {
  apiGetFeedbackType,
  apiSubmitFeedback,
  FeedbackInfoType,
  FeedbackType,
} from '@/apis/user-center'

const { pushParentRoute } = useAppRouter()

const isShowFeedbackPopup = ref(false)
const submitTooltip = ref<string[]>([])
const form = ref<Form>()
const formData = reactive<FeedbackInfoType>({
  questionType: -1,
  content: '',
  imageList: [],
  communication: '',
})

const value = toRef(formData, 'communication')
const { options } = useAutoComplete({
  value: value,
  match: ['@qq.com', '@163.com', '@gmail.com'],
})

const qsList = ref<FeedbackType[]>([])

const handleSubmit = () => {
  form.value?.validate().then((res) => {
    if (!res) return
    apiSubmitFeedback(toRaw(formData)).then((res) => {
      submitTooltip.value = res.data.info.split('\n')

      isShowFeedbackPopup.value = true
    })
  })
}

const fetchQsType = async () => {
  try {
    const res = await apiGetFeedbackType()
    qsList.value = res.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchQsType()
})
</script>
<style lang="less" scoped>
.popup-block {
  background: var(--light-bg-color);
  color: var(--light-font-secondary-color);
  padding: 24px 16px;
  width: 280px;
  line-height: 25px;
  border-radius: 8px;
}
</style>
