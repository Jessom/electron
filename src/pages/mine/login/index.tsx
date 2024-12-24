import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import "./index.less"

const Setting = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button type='primary' onClick={() => {
        navigate("/dashboard")
        window.ipcRenderer.send("login", true)
      }}>登录</Button>
    </div>
  )
}

export default Setting
