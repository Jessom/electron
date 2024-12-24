<template>
  <div class="container">
    <a-button type="primary" block @click="onLogin">登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "../../../store/user.store"
const store = userStore()
const onLogin = () => {
  store.login()
}
</script>

<style lang="less" scoped>
.container {
  background: linear-gradient(to bottom, #F8E0E9, #F7F7FB);
  height: 100vh;
  padding: 2rem 2.5rem;
}
</style>
