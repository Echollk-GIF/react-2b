import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import TopHeader from '../../components/SandBox/TopHeader'
import SideMenu from '../../components/SandBox/SideMenu'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/role/RoleList'
import RightList from './right-manage/right/RightList'
import NoPermission from './noPermission/NoPermission'

import './SandBox.css'

import { Layout, theme } from 'antd'
const { Content } = Layout
export default function SandBox () {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout>
      <SideMenu collapsed={collapsed} />
      <Layout className="site-layout">
        <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="user-manage/list" element={<UserList />} />
            <Route path="right-manage/role/list" element={<RoleList />} />
            <Route path="right-manage/right/list" element={<RightList />} />
            <Route path="/" element={<Navigate replace from="/" to="home" />} />
            <Route path="/*" element={<NoPermission />} />
          </Routes>
        </Content>
      </Layout>

    </Layout>
  )
}
