import { ipcMain } from "electron"
import Store from "electron-store"
const store = new Store()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setItem = (key: string, value: any) => {
  store.set(key, value)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ipcMain.on("setItem", (e: any) => {
  console.log(e);
  // setItem()
})

export const getItem = (key: string) => {
  return store.get(key)
}

export const removeItem = (key: string) => {
  store.delete(key)
}

export const clear = () => {
  store.clear()
}
