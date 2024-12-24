import axios from 'axios'
import { userStore } from '../store/user.store'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 5000
})

service.interceptors.request.use((config) => {
  const store = userStore()
  if(store.token) {
    config.headers.Authorization = `Bearer ${store.token}`
  }
  return config
}, (error) => {
  return Promise.reject()
})

service.interceptors.response.use((response) => {
  if (response.data?.code === 0) {
    return Promise.resolve(response.data?.data)
  } else {
    return Promise.reject()
  }
}, (error) => {
  const msg = error.response?.data?.message || '请求出错'
  message.error(msg)
  // 登出
  const store = userStore()
  if (error.response?.status === 401) {
    store.logout()
  }
  return Promise.reject()
})

export default service