import React, { useState } from 'react'
import UserRouter from '../../router/UserRouter'
import TopHeader from '../../components/SandBox/TopHeader'
import SideMenu from '../../components/SandBox/SideMenu'

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
            overflow: 'auto'
          }}
        >
          <UserRouter />
        </Content>
      </Layout>

    </Layout>
  )
}
