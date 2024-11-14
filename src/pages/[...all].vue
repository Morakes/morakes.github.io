<template>
  <div class="h-[var(--app-height)] flex items-center justify-center flex-col">
    <var-icon name="alert-circle-outline" size="3em" />
    <div>Not found</div>

    <div class="mt-10">
      <button van-haptics-feedback btn m="3 t8" @click="onBack">Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

function onBack() {
  if (window.history.state.back) {
    history.back()
  } else {
    router.replace('/')
  }
}
</script>

<route lang="json">
{
  "name": "404",
  "meta": {
    "title": "404",
    "i18n": "menus.404Demo"
  }
}
</route>
