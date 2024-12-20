import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom"
// import { WaterMark } from '@ant-design/pro-components';
import NoticeCenter from "../components/NoticeCenter/index"
import logo from '/logo.svg'
import './index.less'
import { BellOutlined, BorderOutlined, CloseOutlined, DashboardOutlined, LeftOutlined, LineOutlined, SearchOutlined, SettingOutlined, SwitcherOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Button, Divider, Input, Layout, Menu, Popover } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const App = () => {
  const naviate = useNavigate()
  const location = useLocation()
  const [windowStatus, setWindowStatus] = useState('normal')
  const [pathname, setPathname] = useState('/')
  const [menus] = useState<MenuItem[]>([
    { key: '/', label: '工具', icon: <DashboardOutlined style={{fontSize: "20px"}} /> },
  ])

  const onBtnClick = (key: string) => {
    window.ipcRenderer.send(key)
    if(key === "window-max") {
      setWindowStatus("max")
    } else if(key === "window-normal") {
      setWindowStatus("normal")
    }
  }

  return (
    <Layout className={`layout`}>
      <div style={{width: '220px'}}></div>
      <Layout.Sider theme='light' width={'220px'} className='sider'>
        {/* logo */}
        <div className='sider-header'>
          <img src={logo} alt="watasi" className='logo' />
          <h1 className='title'>WATASI</h1>
        </div>
        <div className='sider-body'>
          <Menu
            onClick={(e) => {
              if(e.key === pathname) return
              setPathname(e.key)
              naviate(e.key)
            }}
            selectedKeys={pathname ? [pathname] : []}
            mode="inline"
            items={menus}
            style={{backgroundColor: "transparent"}}
          />
        </div>
      </Layout.Sider>
      <Layout>
        {/* <header style={{height: '64px'}}></header> */}
        <Layout.Header className='header'>
          <Button
            icon={<LeftOutlined />}
            disabled={history.length <= 1}
            onClick={() => {
              console.log(history);
              if(history.length > 1) {
                history.go(-1)
              }
            }}
          />
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索方案"
            style={{width: "255px", marginLeft: "6px"}}
          />
          
          <div style={{flex: "1", textAlign: "right"}}>
            <Popover
              trigger={"click"}
              placement='bottom'
              content={<NoticeCenter />}
              overlayClassName="noti-popover"
            >
              <Button
                className='border-0 noticy-btn'
                icon={(
                  <Badge dot>
                    <BellOutlined />
                  </Badge>
                )}
              />
            </Popover>
            <Button
              className='border-0'
              icon={<SettingOutlined />}
              onClick={() => {
                setPathname("")
                naviate("/mine/setting")
              }}
            />
            <Divider type='vertical' />
            <Button
              className='border-0'
              icon={<LineOutlined style={{fontSize: '14px'}} />}
              onClick={() => onBtnClick("window-min")}
            />
            { windowStatus === "normal" ? (
              <Button
                className='border-0'
                icon={<BorderOutlined style={{fontSize: '14px'}} />}
                onClick={() => onBtnClick("window-max")}
              />
            ) : (
              <Button
                className='border-0'
                icon={<SwitcherOutlined style={{fontSize: '14px'}} />}
                onClick={() => onBtnClick("window-normal")}
              />
            ) }
            <Button
              className='border-0'
              icon={<CloseOutlined style={{fontSize: '14px'}} />}
              onClick={() => onBtnClick("window-close")}
            />
          </div>
        </Layout.Header>

        <Layout.Content className='content'>
          {/* <WaterMark content={"张三9847"}> */}
            <Outlet />
          {/* </WaterMark> */}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
