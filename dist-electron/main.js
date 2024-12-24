import { Menu, app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
function buildMenu() {
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);
}
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let loginWindow;
let mainWindow;
function createWindow(config, url) {
  const baseConfig = {
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
      // sandbox: false,
      // webSecurity: false,
      // nodeIntegration: true, // 根据需要设置
      // contextIsolation: false, // 根据需要设置
      // devTools: true
    }
  };
  const finalConfig = { ...baseConfig, ...config };
  const win = new BrowserWindow(finalConfig);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(url);
  }
  buildMenu();
  win.once("ready-to-show", () => win.show());
  return win;
}
function createLoginWindow() {
  loginWindow = createWindow(
    {
      width: 320,
      height: 448,
      autoHideMenuBar: true
    },
    path.join(__dirname, "index.html")
  );
  loginWindow.webContents.on("did-finish-load", () => {
    loginWindow == null ? void 0 : loginWindow.webContents.send("replace", "/login");
  });
  loginWindow.setIcon(path.join(process.env.VITE_PUBLIC, "logo.jpg"));
  ipcMain.once("login", () => {
    loginWindow == null ? void 0 : loginWindow.close();
    createMainWindow();
  });
}
function createMainWindow() {
  mainWindow = createWindow(
    {
      width: 1057,
      height: 752,
      autoHideMenuBar: false
    },
    path.join(__dirname, "index.html")
  );
  mainWindow.setIcon(path.join(process.env.VITE_PUBLIC, "logo.jpg"));
  ipcMain.once("open-window", () => {
    createMainWindow();
  });
  ipcMain.once("logout", () => {
    mainWindow == null ? void 0 : mainWindow.close();
    createLoginWindow();
  });
}
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow();
  }
});
app.whenReady().then(createLoginWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
