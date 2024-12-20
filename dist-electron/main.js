import { app as n, BrowserWindow as s, ipcMain as t } from "electron";
import { createRequire as l } from "node:module";
import { fileURLToPath as m } from "node:url";
import o from "node:path";
l(import.meta.url);
const r = o.dirname(m(import.meta.url));
process.env.APP_ROOT = o.join(r, "..");
const i = process.env.VITE_DEV_SERVER_URL, _ = o.join(process.env.APP_ROOT, "dist-electron"), c = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : c;
let e;
function a() {
  e = new s({
    width: 1057,
    height: 752,
    frame: !1,
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: !1,
      // 保持安全性
      contextIsolation: !0,
      preload: o.join(r, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(c, "index.html")), e.setIcon(o.join(process.env.VITE_PUBLIC, "logo.jpg"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  s.getAllWindows().length === 0 && a();
});
n.whenReady().then(a);
t.on("window-max", function() {
  e == null || e.maximize();
});
t.on("window-normal", function() {
  e == null || e.restore();
});
t.on("window-min", function() {
  e == null || e.minimize();
});
t.on("window-close", function() {
  e == null || e.close();
});
export {
  _ as MAIN_DIST,
  c as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
