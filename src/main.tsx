import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN';
import './index.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: "#FC3B5B"
      }
    }}
  >
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  </ConfigProvider>
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
