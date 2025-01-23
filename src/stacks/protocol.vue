<template>
  <router-stack>
    <var-style-provider class="page-wrap">
      <app-header color="#F5F7FA" text-color="var(--light-font-color)">
        <template #left>
          <span class="font-600 ml-2">隐私协议</span>
        </template>
      </app-header>
      <div class="main">
        欢迎使用笔墨阅读，我们将通过《隐私政策》帮助您了解我们收集、
        使用、存储和共享个人信息的情况，特别是我们所采集的个人信息类型及其用途。
        同时您还可以了解到您所享有的相关权利和实现途径以及我们为了保护好您的个人信息安全所采用的相关策略。
        我们可能申请并使用到如下权限: 1、我们如何收集和使用您的个人信息
        2、我们如何使用Cookie和同类技术 3、我们如何共享、转让、公开披露您的个人信息
        4、我们如何保护您的个人信息 5、您的权利 6、我们如何处理儿童的个人信息
        7、您的个人信息如何在全球范围转移 8、本政策如何更新 9、本政策的适用 10、争议解决
        11、联系我们 广州哇嘎非常重视个人信息的保护。用户
        (简称“您”)在使用我们的产品或服务时，我们可能会收集和使用您的相关信息。一旦您选择使用我们的产品或服务，
        即表示您认可并接受本条款现有内容及其可能随时更新的内容。如果您不同意，应当终止使用本产品的服务。
        请您在使用我们的产品前，仔 欢迎使用笔墨阅读，我们将通过《隐私政策》帮助您了解我们收集、
        使用、存储和共享个人信息的情况，特别是我们所采集的个人信息类型及其用途。
        同时您还可以了解到您所享有的相关权利和实现途径以及我们为了保护好您的个人信息安全所采用的相关策略。
        我们可能申请并使用到如下权限: 1、我们如何收集和使用您的个人信息
        2、我们如何使用Cookie和同类技术 3、我们如何共享、转让、公开披露您的个人信息
        4、我们如何保护您的个人信息 5、您的权利 6、我们如何处理儿童的个人信息
        7、您的个人信息如何在全球范围转移 8、本政策如何更新 9、本政策的适用 10、争议解决
        11、联系我们 广州哇嘎非常重视个人信息的保护。用户
        (简称“您”)在使用我们的产品或服务时，我们可能会收集和使用您的相关信息。一旦您选择使用我们的产品或服务，
        即表示您认可并接受本条款现有内容及其可能随时更新的内容。如果您不同意，应当终止使用本产品的服务。
        请您在使用我们的产品前，仔 欢迎使用笔墨阅读，我们将通过《隐私政策》帮助您了解我们收集、
        使用、存储和共享个人信息的情况，特别是我们所采集的个人信息类型及其用途。
        同时您还可以了解到您所享有的相关权利和实现途径以及我们为了保护好您的个人信息安全所采用的相关策略。
        我们可能申请并使用到如下权限: 1、我们如何收集和使用您的个人信息
        2、我们如何使用Cookie和同类技术 3、我们如何共享、转让、公开披露您的个人信息
        4、我们如何保护您的个人信息 5、您的权利 6、我们如何处理儿童的个人信息
        7、您的个人信息如何在全球范围转移 8、本政策如何更新 9、本政策的适用 10、争议解决
        11、联系我们 广州哇嘎非常重视个人信息的保护。用户
        (简称“您”)在使用我们的产品或服务时，我们可能会收集和使用您的相关信息。一旦您选择使用我们的产品或服务，
        即表示您认可并接受本条款现有内容及其可能随时更新的内容。如果您不同意，应当终止使用本产品的服务。
        请您在使用我们的产品前，仔
      </div>
      <div class="footer">
        <div class="footer__tip">
          您认可并接受本条款现有内容及其可能随时更新的内容。如果您不同意，应当终止使用本产品的服务。
        </div>
        <div class="footer__handler">
          <var-button
            :elevation="0"
            block
            color="var(--light-bg-color)"
            text-color="var(--light-font-color)"
            style="border: 1px solid #e5e6eb"
            @click="router.back()"
            >不同意</var-button
          >
          <var-button
            type="primary"
            :elevation="0"
            block
            text-color="var(--dark-font-color)"
            @click="router.back()"
            >同意</var-button
          >
        </div>
      </div>
    </var-style-provider>
  </router-stack>
</template>
<script lang="ts" setup>
import { useAppRouter } from '@/use'

const { router } = useAppRouter()
</script>
<style lang="less" scoped>
.page-wrap {
  --app-btm-height: 90px;
  .main {
    height: calc(100vh - var(--app-bar-height) - var(--app-btm-height));
    overflow: auto;
    background: var(--light-bg-color);
    color: var(--light-font-color);
  }
  .footer {
    height: var(--app-btm-height);
    background-color: #f5f7fa;
    &__tip {
      padding: 5px 8px;
      background-color: rgba(#d0d1d3, 0.1);
      width: 100vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--light-font-color);
    }
    &__handler {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      padding: 0 10px;
    }
  }
}
</style>
