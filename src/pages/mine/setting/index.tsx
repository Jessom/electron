import type { MenuProps } from 'antd'
import { Button, Layout, List, Menu, Switch } from "antd"
import { useState } from 'react'
type MenuItem = Required<MenuProps>['items'][number]
import "./index.less"

const Setting = () => {
  const [actived, setActived] = useState("safe")
  const menus: MenuItem[] = [
    { key: 'safe', label: '安全设置' },
    { key: 'message', label: '消息通知' },
    { key: 'about', label: '关于' },
  ]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const versions = (window as any).versions;
  return (
    <Layout style={{paddingTop: "15px", backgroundColor: "#fff"}}>
      <Layout.Sider theme="light" style={{borderRight: "1px solid rgba(5, 5, 5, 0.06)"}}>
        <Menu
          onClick={(e) => {
            if(e.key === actived) return
            setActived(e.key)
          }}
          selectedKeys={actived ? [actived] : []}
          mode="inline"
          items={menus}
          style={{backgroundColor: "transparent"}}
        />
      </Layout.Sider>
      <Layout.Content className='setting-content'>
        { actived === "safe" ? (
          <div className='panel'>
            <div className='title'>安全设置</div>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: "账户密码", describe: "当前密码强度：强", btnTxt: "修改" },
                { title: "密保手机", describe: "已绑定手机：138****8293", btnTxt: "修改" },
                { title: "密保问题", describe: "未设置密保问题，密保问题可有效保护账户安全", btnTxt: "设置" },
                { title: "备用邮箱", describe: "已绑定邮箱：ant***sign.com", btnTxt: "修改" },
                { title: "MFA 设备", describe: "未绑定 MFA 设备，绑定后，可以进行二次确认", btnTxt: "绑定" },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[<a key="list-loadmore-edit">{item.btnTxt}</a>]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.describe}
                  />
                </List.Item>
              )}
            />
          </div>
        ) : actived === "message" ? (
          <div className='panel'>
            <div className='title'>消息通知</div>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: "账户密码", describe: "其他用户的消息将以站内信的形式通知" },
                { title: "系统消息", describe: "系统消息将以站内信的形式通知" },
                { title: "待办任务", describe: "待办任务将以站内信的形式通知" },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={[<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.describe}
                  />
                </List.Item>
              )}
            />
          </div>
        ) : (
          <div className='panel'>
            <div className='title'>关于</div>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: "当前版本", describe: "当前版本：1.0.0（202412201）", actions: [<Button type='default' size='small' shape="round">监测更新</Button>] },
                { title: "node版本", describe: `${versions?.node()}`, actions: [] },
                { title: "chrome版本", describe: `${versions?.chrome()}`, actions: [] },
                { title: "electron版本", describe: `${versions?.electron()}`, actions: [] },
              ]}
              renderItem={(item) => (
                <List.Item
                  actions={item.actions}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.describe}
                  />
                </List.Item>
              )}
            />
          </div>
        ) }
      </Layout.Content>
    </Layout>
  )
}

export default Setting
