import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../views/SandBox/home/Home'
import UserList from '../views/SandBox/user-manage/UserList'
import RoleList from '../views/SandBox/right-manage/role/RoleList'
import RightList from '../views/SandBox/right-manage/right/RightList'
import NoPermission from '../views/SandBox/noPermission/NoPermission'
import { getPermissionList } from '../api/right'

const LocalRouterMap = {
  "/home": <Home />,
  "/user-manage/list": <UserList />,
  "/right-manage/role/list": <RoleList />,
  "/right-manage/right/list": <RightList />,
  // "/news-manage/add": <NewsAdd/>,
  // "/news-manage/draft": <NewsDraft/>,
  // "/news-manage/category": <NewsCategory/>,
  // "/audit-manage/audit": <Audit/>,
  // "/audit-manage/list": <AuditList/>,
  // "/publish-manage/unpublished": <Unpublished/>,
  // "/publish-manage/published": <Published/>,
  // "/publish-manage/sunset": <Sunset/>,
}
export default function UserRouter () {
  const [backRouteList, setbackRouteList] = useState([])

  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && (item.pagepermission || item.routepermisson)
  }

  const { role: { rights } } = JSON.parse(localStorage.getItem("userInfo"))

  const checkUserPermission = (item) => {
    return rights.includes(item.key)
  }
  useEffect(() => {
    getPermissionList().then((res) => {
      let tempArray = []
      res.forEach((item) => {
        tempArray.push(item)
        if (item.children && item.children.length !== 0) {
          item.children.forEach((item) => {
            tempArray.push(item)
          })
        }
      })
      setbackRouteList(tempArray)
    })
  }, [])
  return (
    <div>
      <Routes>
        {/* <Route path="home" element={<Home />} />
        <Route path="user-manage/list" element={<UserList />} />
        <Route path="right-manage/role/list" element={<RoleList />} />
        <Route path="right-manage/right/list" element={<RightList />} /> */}

        {
          backRouteList.map((item) => {
            if (checkRoute(item) && checkUserPermission(item)) {
              return (
                <Route
                  path={item.key}
                  key={item.key}
                  element={LocalRouterMap[item.key]}
                />
              )
            } else {
              return null
            }
          })
        }

        <Route path="/" element={<Navigate replace from="/" to="home" />} />
        <Route path="/*" element={<NoPermission />} />
      </Routes>
    </div>
  )
}
