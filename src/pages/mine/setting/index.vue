<template>
  <div class="card">
    <a-button @click="onLogout">退出登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { userStore } from '../../../store/user.store'
const store = userStore()

const onLogout = () => {
  message.success("操作成功")
  store.logout()
}
</script>

<style lang="less">

</style>
