import { Menu } from 'electron'
export function buildMenu() {
  // 根据菜单模板创建菜单
  const menu = Menu.buildFromTemplate([])
  // 将菜单设置为应用程序的主菜单
  Menu.setApplicationMenu(menu)
}