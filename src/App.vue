<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#FC3D49'
      }
    }"
  >
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import { onMounted } from "vue";
import { RouterView, useRouter } from "vue-router"
const router = useRouter()

onMounted(() => {
  window.ipcRenderer.on("replace", (_event, path: string) => {
    router.replace(path)
  })
})
</script>

<style scoped>

</style>
