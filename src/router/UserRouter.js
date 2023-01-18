import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../views/SandBox/home/Home'
import UserList from '../views/SandBox/user-manage/UserList'
import RoleList from '../views/SandBox/right-manage/role/RoleList'
import RightList from '../views/SandBox/right-manage/right/RightList'
import NoPermission from '../views/SandBox/noPermission/NoPermission'
export default function UserRouter () {
  return (
    <div>
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
