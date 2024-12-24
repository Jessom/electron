import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref(null)

  async function login() {
    window.ipcRenderer.send("login")
  }

  // 登出的逻辑
  function logout() {
    window.ipcRenderer.send("logout")
  }

  // 获取用户信息的逻辑
  async function getUserInfo() {
  }

  return {
    userInfo,
    token,
    getUserInfo,
    logout,
    login
  }
})