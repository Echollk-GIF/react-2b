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

  const createSideMenu = (menuList) => {
    return menuList.map((item) => {
      // 移除空children节点
      if (item.children.length === 0) {
        delete item["children"]
      }
      // 移除无pagepermission权限节点
      if (item.children !== undefined) {
        for (let i = 0; i < item.children.length; i++) {
          if (item.children[i].pagepermission === undefined || item.children[i].pagepermission === 0 || item.children[i].pagepermission !== 1) {
            delete item.children[i]
          }
        }
      }
      return item
    })
  }
  useEffect(() => {
    getSideMenu().then((res) => {
      //对返回的数据进行page权限判断（是否显示和是否有权限显示）
      setMenu(createSideMenu(res.data))
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
