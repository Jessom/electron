import { CheckCircleTwoTone, CloseCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';
import { Card, Empty, List } from 'antd';
import React, { useEffect, useState } from 'react';

const NoticeCenter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  })
  return (
    <Card
      loading={loading}
      bordered={false}
      actions={[
        <a>全部已读</a>,
        <a>查看更多</a>,
      ]}
      style={{ minWidth: 300 }}
    >
      <List
        itemLayout="horizontal"
        dataSource={[
          { avatar: <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize: "24px"}} />, title: "您的报销已通过", describe: "4小时前", isRead: false, },
          { avatar: <CloseCircleTwoTone twoToneColor="#f5222d" style={{fontSize: "24px"}} />, title: "您的请假被拒绝", describe: "6小时前", isRead: true, },
          { avatar: <ExclamationCircleTwoTone twoToneColor="#faad14" style={{fontSize: "24px"}} />, title: "您有一条审批待处理", describe: "1天前", isRead: false, },
        ]}
        renderItem={(item) => (
          <List.Item style={{opacity: item.isRead ? 0.5 : 1}}>
            <List.Item.Meta
              avatar={item.avatar}
              title={<a>{item.title}</a>}
              description={item.describe}
            />
          </List.Item>
        )}
      />
      {/* <Empty /> */}
    </Card>
  )
};

export default NoticeCenter;
