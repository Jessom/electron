<template>
  <div class="card">
    <h1>仪表盘</h1>
    <a-button @click="onNavigator('/mine/setting')">设置</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

const onNavigator = (url: string) => {
  router.push(url)
}
</script>

<style>

</style>
