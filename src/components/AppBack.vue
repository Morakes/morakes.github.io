<template>
  <var-icon class="text-[40px]!" name="chevron-left" @click="goBack" />
</template>

<script setup lang="ts">
const { pushParentRoute } = useAppRouter()

function goBack() {
  pushParentRoute()
}
</script>
