import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import { Button } from 'ant-design-vue'
import { router } from "./router"
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'

const store = createPinia()

createApp(App)
  .use(router)
  .use(store)
  .use(Button)
  .mount('#app')
  .$nextTick(() => {
    // Use contextBridge
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.log(message)
    })
  })
