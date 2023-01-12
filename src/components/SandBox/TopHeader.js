import React from 'react'
import { Layout, theme, Dropdown, Space, Avatar } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
const { Header } = Layout

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        超级管理员
      </a>
    ),
  },
  {
    key: '2',
    danger: true,
    label: '退出登录',
  },
]

export default function TopHeader (props) {
  const { collapsed, setCollapsed } = props
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Header
      style={{
        padding: '0 16px',
        background: colorBgContainer,
      }}
    >
      {
        collapsed ?
          <MenuUnfoldOutlined onClick={() => { setCollapsed(!collapsed) }} />
          : <MenuFoldOutlined onClick={() => { setCollapsed(!collapsed) }} />
      }
      <div style={{ float: 'right' }}>
        <span>欢迎admin回来</span>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a href='http://www.baidu.com' onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size="default" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}
