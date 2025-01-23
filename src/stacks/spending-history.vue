<template>
  <router-stack>
    <app-header title="消费记录" title-position="left">
      <template #left><app-back /></template>
    </app-header>

    <var-list>
      <!-- <template v-for="item in mock"> </template> -->
    </var-list>
  </router-stack>
</template>
<script lang="ts" setup>
import { apiGetCoinConsume } from '@/apis/user-center'

const mock = [
  {
    title: '测试测试测试测试测试',
    describe: 'expasdense adasdafas qaz qwe',
    time: '2022-01-01',
    price: '100',
    id: 0,
    type: 3,
    image: 'https://img.yzcdn.cn/vant-weapp/cat.jpeg',
  },
]

const page = reactive({
  page: 1,
  pagesize: 10,
  total: 0,
})

async function fetchData() {
  const res = await apiGetCoinConsume({
    page: page.page,
    pagesize: page.pagesize,
  })

  console.log(res)
}

onMounted(() => {
  fetchData()
})
</script>
<style lang="less" scoped></style>
