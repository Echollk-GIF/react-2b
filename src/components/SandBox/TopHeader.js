import React from 'react'
import { Layout, theme, Dropdown, Space, Avatar } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Header } = Layout

const { role: { roleName }, username } = JSON.parse(localStorage.getItem('userInfo'))

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        {roleName}
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
  const navigate = useNavigate()
  const { collapsed, setCollapsed } = props
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  //点击DropDown回调
  const handleMenuClick = (e) => {
    if (e.key === '2') {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      navigate('/login')
    }
  }
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
        <span>欢迎<span style={{ color: '#1890ff' }}>{username}</span>回来</span>
        <Dropdown
          menu={{
            items,
            onClick: handleMenuClick
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
