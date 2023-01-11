import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TopHeader from '../../components/SandBox/TopHeader'
import SideMenu from '../../components/SandBox/SideMenu'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './user-manage/right-manage/role/RoleList'
import RightList from './user-manage/right-manage/right/RightList'
import NoPermission from './noPermission/NoPermission'
export default function SandBox () {
  return (
    <div>
      <TopHeader />
      <SideMenu />

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="user-manage/list" element={<UserList />} />
        <Route path="right-manage/role/list" element={<RoleList />} />
        <Route path="right-manage/right/list" element={<RightList />} />
        <Route path="/" element={<Navigate replace from="/" to="home" />} />
        <Route path="/*" element={<NoPermission />} />
      </Routes>
    </div>
  )
}
