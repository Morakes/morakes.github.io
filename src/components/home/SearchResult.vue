<template>
  <custom-skeleton title avatar :rows="3" :loading="loading">
    <var-space direction="column" size="10" class="w-full px-[10px] pt-[40px]">
      <vertical-mode
        :cover-props="{
          height: '136px',
          width: '102px',
        }"
        :list="mockData"
      />
    </var-space>
  </custom-skeleton>
</template>
<script lang="ts" setup>
import VerticalMode from '@/components/home/module-video/components/VerticalMode.vue'
import Cover1 from '@/assets/images/avatar.jpg'
import Cover2 from '@/assets/images/avatar.jpg'
import Cover3 from '@/assets/images/avatar.jpg'

const loading = ref(true)

const mockData: Record<string, string>[] = [
  {
    cover: Cover1,
    badge: 'New',
    totalEpisodeNum: '12',
    videoName: '标题文字标题文字标题文字标题文字标题文字标题文字',
    summary: '描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字',
    tagInfo: ['War', 'Action', 'Fantasy', 'Epic'],
  },
  {
    cover: Cover2,
    videoName: '标题文字标题文字标题文字标题文字',
    totalEpisodeNum: '12',
    badge: 'Original',
    summary: '',
  },
  {
    cover: Cover3,
    videoName: '标题文字',
    totalEpisodeNum: '12',
    summary: '',
  },
  {
    cover: Cover3,
    videoName: '标题文字',
    totalEpisodeNum: '12',
    summary: '',
  },
  {
    cover: Cover3,
    videoName: '标题文字',
    totalEpisodeNum: '12',
    summary: '',
  },
  {
    cover: Cover3,
    videoName: '标题文字',
    totalEpisodeNum: '12',
    summary: '',
  },
]

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>
<style lang="less" scoped></style>
