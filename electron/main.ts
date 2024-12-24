import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { buildMenu } from "./common/menu"

createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// let win: BrowserWindow | null
let loginWindow: BrowserWindow | null
let mainWindow: BrowserWindow | null

function createWindow(config: BrowserWindowConstructorOptions, url: string) {
  const baseConfig = {
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      // sandbox: false,
      // webSecurity: false,
      // nodeIntegration: true, // 根据需要设置
      // contextIsolation: false, // 根据需要设置
      // devTools: true
    }
  }

  /* if (process.platform === 'linux') {
    baseConfig.icon = icon
  } */

  const finalConfig = { ...baseConfig, ...config }
  const win = new BrowserWindow(finalConfig)

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(url)
  }
  buildMenu()
  win.once('ready-to-show', () => win.show())

  return win
}

// 创建登录窗口
function createLoginWindow() {
  loginWindow = createWindow(
    {
      width: 320,
      height: 448,
      autoHideMenuBar: true
    },
    path.join(__dirname, "index.html")
  )

  // 加载 /login 路由
  loginWindow.webContents.on('did-finish-load', () => {
    loginWindow?.webContents.send('replace', '/login')
  })
  loginWindow.setIcon(path.join(process.env.VITE_PUBLIC, 'logo.jpg'));
  // loginWindow.webContents.openDevTools()
  ipcMain.once('login', () => {
    loginWindow?.close()
    createMainWindow()
  })
}

// 创建主窗口
function createMainWindow() {
  mainWindow = createWindow(
    {
      width: 1057,
      height: 752,
      autoHideMenuBar: false
    },
    path.join(__dirname, 'index.html')
  )
  
  mainWindow.setIcon(path.join(process.env.VITE_PUBLIC, 'logo.jpg'));
  ipcMain.once('open-window', () => {
    createMainWindow()
  })

  ipcMain.once('logout', () => {
    mainWindow?.close()
    createLoginWindow()
  })

}

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow()
  }
})

app.whenReady().then(createLoginWindow)
