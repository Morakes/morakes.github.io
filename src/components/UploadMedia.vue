<template>
  <var-uploader
    v-bind="props"
    v-model="files"
    @before-read="handleBeforeRead"
    @after-read="handleAfterRead"
    @before-remove="handleBeforeRemove"
  >
    <template v-for="(_, name) in slots" #[name] :key="name">
      <slot :name="name" />
    </template>
  </var-uploader>
</template>

<script lang="ts" setup>
import { UploaderProps, VarFile } from '@varlet/ui/types/uploader'
import { apiUploadFile } from '@/apis/common'
import { UPLOAD_TYPE_ENUM } from '@/constant/common'
import { Slots } from 'vue'

interface Props extends UploaderProps {
  value: Record<string, string>[]
  uploadType: UPLOAD_TYPE_ENUM
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  ripple: true,
  previewed: true,
  removable: true,
  multiple: true,
})

const slots = useSlots() as Slots
const emits = defineEmits(['update:value'])

watch(
  () => props.value,
  () => {
    files.value = props.value
  },
  { deep: true }
)

const files = ref<Record<'url' | 'cover' | 'id', string>[]>([])

// 上传前预处理 返回假值阻止文件读取
const handleBeforeRead = async (_file: VarFile) => {
  return true
}

const handleAfterRead = async (_file: VarFile) => {
  try {
    const res = await apiUploadFile({
      imgFile: _file.file,
      uploadType: props.uploadType,
    })

    files.value.forEach((item) => {
      if (item.id === _file.id) {
        item.url = res.data.url!
      }
    })

    emits('update:value', files.value)
  } catch (error) {
    console.log(error)
  }
}

const handleBeforeRemove = (_file: VarFile) => {
  files.value = files.value.filter((item) => item.url !== _file.url)
  emits('update:value', files.value)
}
</script>

<style lang="less" scoped>
:deep(.var-uploader__action) {
  background: var(--bg-layer-2);
  color: var(--font-color);
}
</style>
