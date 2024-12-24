import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    /* width: 1057,
    height: 752, */
    width: 320,
    height: 448,
    frame: false,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      nodeIntegration: false, // 保持安全性
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })
  
  win.webContents.openDevTools()
  console.log(VITE_DEV_SERVER_URL);
  
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  win.setIcon(path.join(process.env.VITE_PUBLIC, 'logo.jpg'));
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// 窗口最大化
ipcMain.on('window-max', function () {
  win?.maximize();
})
// 窗口回复
ipcMain.on('window-normal', function () {
  win?.restore();
})

// 窗口最小化
ipcMain.on('window-min', function () {
  win?.minimize();
})

// 窗口关闭
ipcMain.on('window-close', function () {
  win?.close();
})

// 登录成功
ipcMain.on("login", function() {
  win?.setSize(1057, 752)
})

// 退出登录
ipcMain.on("logout", function() {
  win?.setSize(320, 448)
})
