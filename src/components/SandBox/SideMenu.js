import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
} from '@ant-design/icons'
import './index.css'
const { Sider } = Layout

//模拟数组结构
const menuList = [
  {
    key: '/home',
    label: '首页',
    icon: <UserOutlined />,
  },
  {
    key: '/user-manage',
    label: '用户管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/user-manage/list',
        label: '用户列表',
        icon: <UserOutlined />,
      },
    ]
  },
  {
    key: '/right-manage',
    label: '权限管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/right-manage/role/list',
        label: '角色列表',
        icon: <UserOutlined />,
      },
      {
        key: '/right-manage/right/list',
        label: '权限列表',
        icon: <UserOutlined />,
      }
    ]
  }
]
export default function SideMenu () {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" >LOGO</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        items={menuList}
        onSelect={(e) => { navigate(e.key) }}
      />
    </Sider>
  )
}
