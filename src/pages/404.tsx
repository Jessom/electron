import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom"
import React from 'react';

const App: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => {navigate("/")}}>返回首页</Button>}
    />
  )
};

export default App;