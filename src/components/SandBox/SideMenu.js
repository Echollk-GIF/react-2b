import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  FormOutlined,
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  AuditOutlined,
  BarChartOutlined
} from "@ant-design/icons"
import './index.css'

import { getPermissionList } from '../../api/user'
const { Sider } = Layout

export default function SideMenu (props) {
  const navigate = useNavigate()
  const location = useLocation()

  const { collapsed } = props

  const selectKeys = [location.pathname]
  const openKeys = ["/" + location.pathname.split("/")[1]]
  const [menu, setMenu] = useState([])

  const [iconList] = useState({
    "/home": <HomeOutlined />,
    "/user-manage": <UserOutlined />,
    "/right-manage": <FormOutlined />,
    "/news-manage": <InfoCircleOutlined />,
    "/audit-manage": <AuditOutlined />,
    "/publish-manage": <BarChartOutlined />
  })

  const createSideMenu = (menuList) => {
    return menuList.map((item) => {
      item.icon = iconList[item.key]
      item.label = item.title
      // 移除空children节点
      if (item.children && item.children.length === 0) {
        delete item["children"]
      }
      // 移除无pagepermission权限节点
      if (item.children !== undefined) {
        for (let i = 0; i < item.children.length; i++) {
          if (item.children[i].pagepermission === undefined || item.children[i].pagepermission !== 1) {
            delete item.children[i]
          }
        }
        //递归处理
        createSideMenu(item.children)
      }
      return item
    })
  }
  useEffect(() => {
    getPermissionList().then((res) => {
      //对返回的数据进行page权限判断（是否显示和是否有权限显示）
      // setMenu(createSideMenu(res.data))
      setMenu(createSideMenu(res))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo" >LOGO</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            items={menu}
            onSelect={(e) => { navigate(e.key) }}
          />
        </div>
      </div>
    </Sider>
  )
}
