import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import './index.css'

import { getSideMenu } from '../../api/user'
const { Sider } = Layout

export default function SideMenu () {
  const navigate = useNavigate()
  const [menu, setMenu] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    getSideMenu().then((res) => {
      setMenu(res.data)
    })
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" >LOGO</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
        items={menu}
        onSelect={(e) => { navigate(e.key) }}
      />
    </Sider>
  )
}
